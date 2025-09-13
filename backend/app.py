import os, requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

COLAB_API_BASE = os.getenv("COLAB_API_BASE", "").rstrip("/")

@app.route("/ai/chat", methods=["POST"])
def ai_chat():
    if not COLAB_API_BASE:
        return jsonify({"error": "COLAB_API_BASE no configurado"}), 500
    data = request.get_json(force=True) or {}
    payload = {
        "message": data.get("message", ""),
        "history": data.get("history") or []
    }
    try:
        r = requests.post(f"{COLAB_API_BASE}/chat", json=payload, timeout=60)
        r.raise_for_status()
        res = r.json()
        return jsonify({"answer": res.get("answer", "")})
    except Exception as e:
        return jsonify({"error": str(e)}), 502

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)


