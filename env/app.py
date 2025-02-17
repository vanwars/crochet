from flask import Flask, jsonify, request
from flask_cors import CORS 
import json

app = Flask(__name__)
CORS(app)

# Initialize chart_data as a list
chart_data = []

def add_chart_data(data):
    print("Adding data...")
    print(data, "\n\n")  # Print the data being added
    chart_data.append(data)
    print("Current chart_data:", chart_data, "\n")

def remove_round(round_index):
    if 0 <= round_index < len(chart_data):
        del chart_data[round_index]

@app.route('/submit-sequence', methods=['POST'])
def submit_sequence():
    data = request.get_json()
    print("Received data:", data)  # Print the received data
    add_chart_data(data)  # Directly pass the data to add_chart_data
    return jsonify(data)

@app.route('/get-chart-data', methods=['GET'])
def get_chart_data():
    # Extract only the image fields from each item in chart_data
    return jsonify(chart_data)

@app.route('/hello-world', methods=["GET"])
def hello_world():
    return "hello world"

if __name__ == '__main__':
    app.run(debug=True)
