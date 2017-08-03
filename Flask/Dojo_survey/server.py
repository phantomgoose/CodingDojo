from flask import Flask, render_template, request, redirect

app = Flask(__name__)

name = ""
location = ""
language = ""
comment = ""

@app.route("/")

def root():
    return render_template("index.html")

@app.route("/process", methods=["POST"])

def process():
    global name
    global location
    global language
    global comment
    name = request.form["name"]
    location = request.form["location"]
    language = request.form["language"]
    comment = request.form["comment"]
    return redirect("/results")

@app.route("/results")

def results():
    print "printing name"
    print name
    return render_template("results.html", name=name, location=location, language=language, comment=comment)

app.run(debug=True)
