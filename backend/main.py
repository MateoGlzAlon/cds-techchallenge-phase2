from flask import Flask, request, jsonify

app = Flask(__name__)
@app.route('/api/v1', methods=['GET'])
def api():
    return jsonify({'data': 'Hello, World!'})

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/test", methods=['GET'])
def test_api():
    return {
        "id": 1,
        "name": "Test",
        "description": "Test API",
        "status": "Working"
    }


if __name__ == '__main__':
    app.run(debug=True)
