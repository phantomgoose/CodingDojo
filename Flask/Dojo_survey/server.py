from flask import Flask, render_template, request, redirect, flash, session

app = Flask(__name__)
app.secret_key = "secret"

@app.route("/")
def root():
    return render_template("index.html")


@app.route("/process", methods=["POST"])
def process():
    name = request.form["name"]
    location = request.form["location"]
    language = request.form["language"]
    comment = request.form["comment"]
    if len(name) < 1:
        flash("Please enter a name")
        return redirect("/")
    if len(comment) < 1:
        flash("Please leave a comment")
        return redirect("/")
    if len(comment) > 120:
        flash("Comment cannot be longer than 120 characters.")
        return redirect("/")
    return results(name, location, language, comment)


@app.route("/results")
def results(name="", location="", language="", comment=""):
    return render_template("results.html", name=name, location=location, language=language, comment=comment)


app.run(debug=True)
