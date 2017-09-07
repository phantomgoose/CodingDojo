from flask import Flask, render_template, request, redirect, session
from random import randint

app = Flask(__name__)
app.secret_key = "secret"

@app.route("/")

def root():
    if "gold" not in session.keys():
        session["gold"] = 0
    if "log" not in session.keys():
        session["log"] = ""
    return render_template("index.html", current_gold=session["gold"], log=session["log"])

@app.route("/process_money", methods=["POST"])

def process():
    location = request.form["building"]
    goldDict = {
        "farm": randint(10, 20),
        "cave": randint(5, 10),
        "house": randint(2, 5),
        "casino": randint(-50, 50)
    }

    log_entry = "<p"

    if goldDict[location] > 0:
        log_entry += " class='gained_gold'>Earned "
    else:
        log_entry += " class='lost_gold'>Lost "
    log_entry += str(goldDict[location]) + " gold after visiting the " + location + "</p>"
    session["log"] += log_entry
    session["gold"] += goldDict[location]
    return redirect("/")

@app.route("/reset")

def reset():
    session.clear()
    return redirect("/")

app.run(debug=True)