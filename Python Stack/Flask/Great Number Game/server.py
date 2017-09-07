from flask import Flask, render_template, request, redirect, session
from random import randint

app = Flask(__name__)
app.secret_key = "secret"

@app.route("/")

def root(guess_result="", new_game=False):
    if len(session) < 2 or new_game is True:
        session["random"] = randint(1, 100)
        session["guess"] = -1
    if new_game is False:
        button = "Submit"
        hide = ""
    else:
        button = "Play again!"
        hide = "hidden"
    return render_template("index.html", guess_result=guess_result, button=button, hide=hide)

@app.route("/guess", methods=["POST"])

def guess():
    if len(request.form["guess"]) > 0:
        session["guess"] = int(request.form["guess"])
        print "read the following guess" + str(session["guess"])
        if session["guess"] > session["random"]:
            return root("Too high! Guess again.")
        elif session["guess"] < session["random"]:
            return root("Too low! Guess again.")
        else:
            return root("Correct!", True)
    else:
        return redirect("/")

app.run(debug=True)