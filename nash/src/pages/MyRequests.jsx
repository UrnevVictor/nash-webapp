from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), "db.json")

def load_db():
    if not os.path.exists(DB_PATH):
        with open(DB_PATH, "w") as f:
            json.dump({
                "requests": [],
                "ambassadors": [],
                "venues": [],
                "distributors": [],
                "product_lines": []
            }, f, indent=2)

    with open(DB_PATH, "r") as f:
        return json.load(f)

def save_db(data):
    with open(DB_PATH, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

@app.route("/")
def root():
    return jsonify({"message": "NASH backend working"})

# ===== IMPORT ROUTES =====
from backend.routes.requests import requests_bp
app.register_blueprint(requests_bp, url_prefix="/requests")

# ===== START SERVER =====
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)