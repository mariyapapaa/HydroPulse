from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Demo sensor readings
sensor_data = {
    "tds": 250,
    "flow_rate": 1.5,
    "filter_status": "Monitoring"
}

@app.route("/")
def home():
    return "HydroPulse Backend is Running!"

@app.route("/api/sensors", methods=["GET"])
def get_sensors():
    return jsonify(sensor_data)

@app.route("/api/sensors", methods=["POST"])
def update_sensors():
    global sensor_data

    data = request.get_json()

    if not data:
        return jsonify({"error": "No sensor data received"}), 400

    sensor_data.update(data)

    return jsonify({
        "message": "Sensor data updated",
        "data": sensor_data
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5000)