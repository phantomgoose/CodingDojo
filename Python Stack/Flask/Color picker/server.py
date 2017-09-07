from flask import Flask, request, render_template, redirect

app = Flask(__name__)

@app.route("/")

def root(r=255, g=255, b=255):
    return render_template("index.html", red = r, green = g, blue = b)

@app.route("/process", methods = ["POST"])

def process():
    return root(request.form["red"], request.form["green"], request.form["blue"])

app.run(debug=True)
