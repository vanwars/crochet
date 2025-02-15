from flask import Flask, jsonify, request
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

# Initialize chart_data as a list
chart_data = []

def add_chart_data(data):
    print("Adding data...")
    chart_data.append(data)

def remove_round(round_index):
    if 0 <= round_index < len(chart_data):
        del chart_data[round_index]

@app.route('/submit-sequence', methods=['POST'])
def submit_sequence():
    print("recieving...")
    data = request.get_json()
    print("submitted data: ", data)  # Print the data for debugging
    add_chart_data(data)
    print("chart data: ", chart_data)  # Print the updated chart_data for debugging
    return jsonify(data)

@app.route('/get-chart-data', methods=['GET'])
def get_chart_data():
    return jsonify(chart_data)

@app.route('/hello-world', methods=["GET"])
def hello_world():
    return "hello world"

if __name__ == '__main__':
    app.run(debug=True)
