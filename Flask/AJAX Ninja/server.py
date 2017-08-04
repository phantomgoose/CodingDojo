from flask import Flask, render_template, request, redirect, jsonify

app = Flask(__name__)

@app.route("/")

def root():
    return render_template("index.html")

@app.route("/ninja/")

def ninja():
    return render_template("ninja.html")

@app.route("/process", methods=["POST"])

def display_ninja():
    color = request.form["color"]
    if color == "blue":
        turtle = "leonardo"
    elif color == "orange":
        turtle = "michelangelo"
    elif color == "red":
        turtle = "raphael"
    elif color == "purple":
        turtle = "donatello"
    else:
        turtle = "notapril"
    return jsonify(turtle=turtle)

app.run(debug=True)
