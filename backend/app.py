import os, time, requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Config values (can be updated at runtime via config endpoint)
app.config["COLAB_API_BASE"] = os.getenv("COLAB_API_BASE", "").rstrip("/")
app.config["ADMIN_TOKEN"] = os.getenv("ADMIN_TOKEN", "")
app.config["COLAB_CHAT_PATH"] = os.getenv("COLAB_CHAT_PATH", "/chat")
app.config["COLAB_HEALTH_PATH"] = os.getenv("COLAB_HEALTH_PATH", "/health")


def get_colab_base() -> str:
    """Return current Colab API base URL (no trailing slash)."""
    env_value = os.getenv("COLAB_API_BASE", "").rstrip("/")
    # Prefer in-memory config if set, otherwise fall back to environment
    value = (app.config.get("COLAB_API_BASE") or env_value or "").rstrip("/")
    return value


def set_colab_base(new_base: str, persist: bool = False) -> str:
    """Set Colab base URL in memory, optionally persist to a .env file (best-effort)."""
    cleaned = (new_base or "").strip().rstrip("/")
    app.config["COLAB_API_BASE"] = cleaned

    if persist:
        try:
            # Update or append COLAB_API_BASE in .env
            env_path = os.path.join(os.path.dirname(__file__), ".env")
            # If running in environments without writable FS (e.g., Render), this may fail silently
            lines = []
            if os.path.exists(env_path):
                with open(env_path, "r", encoding="utf-8") as f:
                    lines = f.read().splitlines()
            updated = False
            for i, line in enumerate(lines):
                if line.startswith("COLAB_API_BASE="):
                    lines[i] = f"COLAB_API_BASE={cleaned}"
                    updated = True
                    break
            if not updated:
                lines.append(f"COLAB_API_BASE={cleaned}")
            with open(env_path, "w", encoding="utf-8") as f:
                f.write("\n".join(lines) + "\n")
        except Exception:
            # Best-effort persistence; ignore errors
            pass
    return cleaned


def post_to_colab(path: str, json_payload: dict, timeout: int = 60, retries: int = 2):
    base = get_colab_base()
    if not base:
        raise RuntimeError("COLAB_API_BASE no configurado")
    url = f"{base}{path if path.startswith('/') else '/' + path}"

    last_exc = None
    for attempt in range(retries + 1):
        try:
            r = requests.post(url, json=json_payload, timeout=timeout)
            r.raise_for_status()
            return r.json()
        except Exception as exc:
            last_exc = exc
            # brief backoff
            if attempt < retries:
                time.sleep(0.6 * (attempt + 1))
            continue
    # If we exhausted retries
    raise last_exc

@app.route("/ai/chat", methods=["POST"])
def ai_chat():
    data = request.get_json(force=True) or {}
    user_message = data.get("message", "")

    # 👇 Colab espera 'prompt', no 'message'
    payload = {"prompt": user_message}

    try:
        chat_path = app.config.get("COLAB_CHAT_PATH") or "/chat"
        res = post_to_colab(chat_path, payload, timeout=60, retries=2)
        # Normalize answer field names from upstream just in case
        answer = res.get("answer") or res.get("response") or res.get("text") or ""
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 502


@app.route("/health", methods=["GET"])
def health():
    # Optional deep check: verify Colab health
    deep = request.args.get("deep") in ("1", "true", "True")
    if not deep:
        return jsonify({"ok": True})
    base = get_colab_base()
    if not base:
        return jsonify({"ok": True, "colab": {"ok": False, "error": "COLAB_API_BASE no configurado"}}), 200
    try:
        health_path = app.config.get("COLAB_HEALTH_PATH") or "/health"
        r = requests.get(f"{base}{health_path if health_path.startswith('/') else '/' + health_path}", timeout=10)
        r.raise_for_status()
        # Prefer returning upstream health JSON if provided
        upstream = {}
        try:
            upstream = r.json()
        except Exception:
            upstream = {"ok": True}
        return jsonify({"ok": True, "colab": {"ok": True, "upstream": upstream}})
    except Exception as e:
        return jsonify({"ok": True, "colab": {"ok": False, "error": str(e)}}), 200


def _require_admin():
    token = app.config.get("ADMIN_TOKEN") or ""
    provided = request.headers.get("X-Admin-Token", "")
    if not token:
        # If no token configured, allow GET read-only access; protect writes
        if request.method == "GET":
            return True
        return False
    if provided != token:
        return False
    return True


@app.route("/config/colab_base", methods=["GET", "POST"])
def config_colab_base():
    # Simple token-based guard
    if not _require_admin():
        return jsonify({"error": "Unauthorized"}), 401

    if request.method == "GET":
        return jsonify({
            "colab_api_base": get_colab_base(),
            "chat_path": app.config.get("COLAB_CHAT_PATH", "/chat"),
            "health_path": app.config.get("COLAB_HEALTH_PATH", "/health")
        })

    # POST: update
    body = request.get_json(force=True) or {}
    new_base = str(body.get("colab_api_base", ""))
    persist = bool(body.get("persist", False))
    chat_path = body.get("chat_path")
    health_path = body.get("health_path")
    if not new_base:
        return jsonify({"error": "colab_api_base requerido"}), 400

    updated = set_colab_base(new_base, persist=persist)

    # Normalize and set optional paths
    def _norm(p: str) -> str:
        if not isinstance(p, str) or not p:
            return ""
        p = p.strip()
        if not p:
            return ""
        return p if p.startswith("/") else "/" + p

    changed = {"colab_api_base": updated}
    if chat_path is not None:
        cp = _norm(str(chat_path)) or "/chat"
        app.config["COLAB_CHAT_PATH"] = cp
        changed["chat_path"] = cp
    if health_path is not None:
        hp = _norm(str(health_path)) or "/health"
        app.config["COLAB_HEALTH_PATH"] = hp
        changed["health_path"] = hp

    if persist:
        try:
            env_path = os.path.join(os.path.dirname(__file__), ".env")
            lines = []
            if os.path.exists(env_path):
                with open(env_path, "r", encoding="utf-8") as f:
                    lines = f.read().splitlines()
            def upsert(key, value):
                nonlocal lines
                found = False
                for i, line in enumerate(lines):
                    if line.startswith(f"{key}="):
                        lines[i] = f"{key}={value}"
                        found = True
                        break
                if not found:
                    lines.append(f"{key}={value}")
            upsert("COLAB_API_BASE", updated)
            if "chat_path" in changed:
                upsert("COLAB_CHAT_PATH", changed["chat_path"])
            if "health_path" in changed:
                upsert("COLAB_HEALTH_PATH", changed["health_path"])
            with open(env_path, "w", encoding="utf-8") as f:
                f.write("\n".join(lines) + "\n")
        except Exception:
            pass

    return jsonify({"ok": True, **changed})


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)


