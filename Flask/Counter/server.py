from flask import Flask, render_template, session, request, redirect
app = Flask(__name__)
app.secret_key = "secret"

counter = 0

@app.route("/")

def root(increment_by=1):
    session["counter"] += increment_by
    print session["counter"]
    return render_template("index.html")

@app.route("/add2", methods=["POST"])

def add2():
    return root(2)

@app.route("/reset", methods=["POST"])

def reset():
    session["counter"] = 0
    return redirect("/")

app.run(debug=True)