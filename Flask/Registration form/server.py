from flask import Flask, session, render_template, redirect, flash, request
import re
from time import strptime, localtime

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
PASSWORD_REGEX = re.compile(r'(?=.*[0-9].*)(?=.*[A-Z].*)')

app = Flask(__name__)
app.secret_key = "secret"

@app.route("/")
def root():
    return render_template("index.html")

@app.route("/process", methods=["post"])
def process():
    # if there are any errors return root
    email = request.form["email"]
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    password = request.form["password"]
    password_c = request.form["password_c"]
    birthday = request.form["birthday"]
    errors = []

    if somethingIsEmpty(email, first_name, last_name, password, password_c):
        errors.append("All fields are required, pls fix.")
    if not first_name.isalpha() or not last_name.isalpha():
        errors.append("Name must contain latin characters only.")
    if len(password) < 8:
        errors.append("Your password is too weak. It must be at least 8 characters long.")
    if not EMAIL_REGEX.match(email):
        errors.append("Please enter a valid email.")
    if password != password_c:
        errors.append("Password confirmation doesn't match.")
    if not PASSWORD_REGEX.match(password):
        errors.append("Your password is too weak. It must contain at least one upper case letter and at least one number.")
    if strptime(birthday, "%m/%d/%y") >= localtime():
        errors.append("Your birthday must be in the past.")
    if len(errors) > 0:
        for error in errors:
            flash(error)
        return redirect("/")
    else:
        return render_template("result.html", email=email, first_name=first_name, last_name=last_name, password=password, birthday=birthday)


def somethingIsEmpty(*args):
    for var in args:
        if len(var) < 1:
            return True
    return False


app.run(debug=True)
