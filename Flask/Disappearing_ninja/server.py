from flask import Flask, render_template, request, redirect

app = Flask(__name__)

@app.route("/")

def root():
    return render_template("index.html")

@app.route("/ninja/")

def ninja():
    return render_template("ninja.html")

@app.route("/ninja/<color>")

def single_ninja(color):
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
    return render_template("single_ninja.html", turtle=turtle)

app.run(debug=True)
