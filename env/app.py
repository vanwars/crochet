from flask import Flask, jsonify, request

app = Flask(__name__)
# somehow format the data properly into our list
#probaby will just make it only send the ids and I think that's good enough
#then just stick it into a list

chart_data = {}

def add_chart_data(data):
    chart_data = data

def remove_round(round):
    del chart_data[round]


@app.route('/submit-sequence', methods=['POST'])
def submit_sequence():
    data = request.get_json()
    # add_chart_data(data)
    print(data)
    return jsonify("sequence recieved")


