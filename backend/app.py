from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), "database", "db.json")


def load_db():
    if not os.path.exists(DB_PATH):
        return {}
    with open(DB_PATH, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except:
            return {}


def save_db(data):
    with open(DB_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ---------------------
# ROOT
# ---------------------
@app.route("/")
def index():
    return jsonify({"status": "ok", "message": "NASH API running"})


# ---------------------
# UNIVERSAL GET
# ---------------------
@app.route("/api/<entity>", methods=["GET"])
def get_entity(entity):
    db = load_db()
    return jsonify(db.get(entity, []))


# ---------------------
# UNIVERSAL POST
# ---------------------
@app.route("/api/<entity>", methods=["POST"])
def add_entity(entity):
    db = load_db()
    item = request.json
    if entity not in db:
        db[entity] = []
    db[entity].append(item)
    save_db(db)
    return jsonify({"status": "saved", "item": item})


# ---------------------
# UNIVERSAL PUT (update by id)
# ---------------------
@app.route("/api/<entity>/<id>", methods=["PUT"])
def update_entity(entity, id):
    db = load_db()
    if entity not in db:
        return jsonify({"error": "entity not found"}), 404

    updated = request.json
    for i, item in enumerate(db[entity]):
        if str(item.get("id")) == str(id):
            db[entity][i] = updated
            save_db(db)
            return jsonify({"status": "updated", "item": updated})

    return jsonify({"error": "item not found"}), 404


# ---------------------
# UNIVERSAL DELETE
# ---------------------
@app.route("/api/<entity>/<id>", methods=["DELETE"])
def delete_entity(entity, id):
    db = load_db()
    if entity not in db:
        return jsonify({"error": "entity not found"}), 404

    new_list = [i for i in db[entity] if str(i.get("id")) != str(id)]
    db[entity] = new_list
    save_db(db)

    return jsonify({"status": "deleted", "id": id})


# ---------------------
# EXPORT DB (download JSON)
# ---------------------
@app.route("/export", methods=["GET"])
def export_db():
    db = load_db()
    return jsonify(db)


# ---------------------
# IMPORT DB (upload JSON)
# ---------------------
@app.route("/import", methods=["POST"])
def import_db():
    try:
        data = request.get_json()
        if not isinstance(data, dict):
            return jsonify({"error": "Invalid format"}), 400
        save_db(data)
        return jsonify({"status": "imported"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------------
# UPDATE REQUEST STATUS (PATCH)
# ---------------------
@app.route("/api/requests/<id>/status", methods=["PATCH"])
def update_request_status(id):
    db = load_db()

    if "requests" not in db:
        return jsonify({"error": "requests not found"}), 404

    payload = request.json
    shipped = payload.get("shipped")
    reason = payload.get("notShippedReason", "")

    updated = None

    for i, item in enumerate(db["requests"]):
        if str(item.get("id")) == str(id):
            item["shipped"] = bool(shipped)
            item["notShippedReason"] = reason if not shipped else ""
            db["requests"][i] = item
            updated = item
            break

    if not updated:
        return jsonify({"error": "request not found"}), 404

    save_db(db)
    return jsonify({"status": "updated", "item": updated})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)