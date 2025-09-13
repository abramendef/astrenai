import os
import json
import sys
import argparse
import requests


def main():
    parser = argparse.ArgumentParser(description="Test AstrenAI /ai/chat endpoint")
    parser.add_argument("message", nargs="?", default="¿Quién eres?", help="Message to send")
    parser.add_argument("--api", dest="api_base", default=os.getenv("API_BASE", "http://localhost:8000"), help="API base URL, default from API_BASE env or http://localhost:8000")
    args = parser.parse_args()

    url = args.api_base.rstrip("/") + "/ai/chat"
    payload = {"message": args.message, "history": []}

    try:
        r = requests.post(url, json=payload, timeout=60)
        r.raise_for_status()
        data = r.json()
        print(json.dumps(data, ensure_ascii=False, indent=2))
    except Exception as e:
        print(f"Request failed: {e}", file=sys.stderr)
        if hasattr(e, 'response') and getattr(e, 'response') is not None:
            try:
                print(e.response.text)
            except Exception:
                pass
        sys.exit(1)


if __name__ == "__main__":
    main()
