from flask import Flask, render_template, request, flash, redirect, session
from connection import MySQLConnection
import os, binascii, md5, re
from datetime import datetime

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
PASSWORD_REGEX = re.compile(r'(?=.*[0-9].*)(?=.*[A-Z].*)')

app = Flask(__name__)
app.secret_key = 'awodijaoi123123jd123123oiajwd1233128ajd90vjawjdoivaj09av2uj3ja0j'
mysql = MySQLConnection(app, 'wall')

#returns true if any of the strings are less than 2 characters long
def somethingIsTooShort(*strings):
    for s in strings:
        if len(s) < 2:
            return True
    return False


@app.route("/")
def root():
    #check if we're logged in already, proceed to /wall if so
    if all (k in session.keys() for k in ('email', 'user_id')):
        return redirect('/wall')
    return render_template('index.html')


@app.route('/register', methods=['POST'])
# creates a new db entry for the registered user
def register():
    email = request.form['email']
    password = request.form['password']
    cpassword = request.form['cpassword']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    # validation
    errors = []
    if somethingIsTooShort(email, first_name, last_name, password, cpassword):
        errors.append(
            "All fields are required and must be at least 2 characters long, pls fix.")
    if not first_name.isalpha() or not last_name.isalpha():
        errors.append(
            "First and last name must contain latin characters only.")
    if len(password) < 8:
        errors.append(
            "Your password is too weak. It must be at least 8 characters long.")
    if not EMAIL_REGEX.match(email):
        errors.append("Please enter a valid email.")
    if password != cpassword:
        errors.append("Password confirmation doesn't match.")
    if not PASSWORD_REGEX.match(password):
        errors.append(
            "Your password is too weak. It must contain at least one upper case letter and at least one number.")
    if mysql.query_db("SELECT * FROM users WHERE users.email = '{}' LIMIT 1".format(email)):
        errors.append("A user with this email already exists.")
    #if there are any errors at all, flash them all and redirect back to root
    if len(errors) > 0:
        for error in errors:
            flash(error)
        return redirect('/')

    # once we pass validation, hash the pw
    salt = binascii.b2a_hex(os.urandom(15))
    hashed_pw = md5.new(password + salt).hexdigest()

    #insert shit into the db
    insert_query = "INSERT INTO users (first_name, last_name, email, password, salt, created_at, updated_at) VALUES (:first_name, :last_name, :email, :password, :salt, NOW(), NOW())"
    query_data = {'first_name': first_name,
                  'last_name': last_name, 'email': email, 'password': hashed_pw, 'salt': salt}
    mysql.query_db(insert_query, query_data)
    return redirect('/')

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    #find the user in the db by email
    user_query = "SELECT * FROM users WHERE users.email = :email LIMIT 1"
    query_data = {'email': email}
    user = mysql.query_db(user_query, query_data)

    #get the user's hashed pw, if we found the user in our db
    if len(user) != 0:
        #rehash the pw with the user's salt
        hashed_pw = md5.new(password + user[0]['salt']).hexdigest()
        if user[0]['password'] == hashed_pw:
            session['email'] = email
            session['user_id'] = user[0]['id']
            return redirect('/wall')
        else:
            flash('Wrong password!')
            return redirect('/')
    else:
        flash('Email not found. Do you have an account?')
        return redirect('/')

@app.route('/wall')
def wall():
    #gtfo if you're not logged in
    if not all (k in session.keys() for k in ('email', 'user_id')):
        return redirect('/')

    #get logged in user's first name
    user_query = "SELECT * FROM users WHERE users.id = :id LIMIT 1"
    query_data = {'id': session['user_id']}
    user = mysql.query_db(user_query, query_data)
    logged_user_name = user[0]['first_name']

    #get all messages from the db, convert them into a list of html entries
    messages_query = mysql.query_db("SELECT * FROM messages ORDER BY created_at")
    processed_messages = []
    #for all message board messages
    for message in messages_query:
        #get the user who posted the message
        user = mysql.query_db("SELECT * FROM users WHERE id = :user_id", {'user_id': message['user_id']})
        #get their name
        name = user[0]['first_name'] + " " + user[0]['last_name']

        #assemble the html entry for the message
        html = "<div class = 'message'><h3>{} - {}</h3><p>{}</p></div>".format(name, message['created_at'].strftime("%B %d %Y"), message['message'])

        #add a delete button, if the message was posted by the currently logged in user AND it was created less than 30 minutes ago
        time_diff = datetime.now() - message['created_at']
        if message['user_id'] == session['user_id'] and time_diff.seconds < 1800:
            html += "<form class='delete' action='/delete_message' method='POST'><input type='hidden' name='message_id' value={}><input type='submit' name='submit' value='Delete message - CANNOT BE UNDONE!'></form>".format(message['id'])

        #find all comments associated with the message
        comments_query = mysql.query_db("SELECT * FROM comments WHERE message_id = {} ORDER BY created_at DESC".format(message['id']))
        #generate comment html too, add it to current html
        for comment in comments_query:
            #get user who made the comment
            user = mysql.query_db("SELECT * FROM users WHERE id = {}".format(comment['user_id']))
            name = user[0]['first_name'] + " " + user[0]['last_name']

            html += "<div class = 'comment'><h4>{} - {}</h4><p>{}</p></div>".format(name, message['created_at'].strftime("%B %d %Y"), comment['comment'])
        
        #always append the comment submission form at the end of the list of comments with the message's id as a hidden input
        html += "<div class='comment'><form action='/post_comment' method='POST'><p>Post a comment</p><input type='hidden' name='message_id' value='{}'><textarea name='comment'></textarea><p></p><input type='submit' name='submit' value='Post a comment'></form></div>".format(message['id'])

        #push all this good html stuff into the list of messages
        processed_messages.append(html)

    #wall.html parses through processed_messages and displays them
    return render_template('wall.html', name=logged_user_name, messages=processed_messages)

@app.route('/logout', methods=['POST'])
def logout():
    #destroy session and go back to the home page
    session.clear()
    return redirect('/')

@app.route('/post_message', methods=['POST'])
def post_message():
    message = request.form['message']

    #quick validation
    if len(message) < 1:
        flash("Please enter a message!")
        return redirect('/wall')

    #push the message into db
    message_query = "INSERT INTO messages (message, created_at, updated_at, user_id) VALUES (:message, NOW(), NOW(), :user_id)"
    query_data = {'message': message, 'user_id': session['user_id']}
    mysql.query_db(message_query, query_data)
    return redirect('/wall')

@app.route('/post_comment', methods=['POST'])
def post_comment():
    comment = request.form['comment']
    message_id = request.form['message_id']

    #quick validation
    if len(comment) < 1:
        flash("Please enter a comment!")
        return redirect('/wall')

    #push the comment into db
    comments_query = "INSERT INTO comments (comment, created_at, updated_at, user_id, message_id) VALUES (:comment, NOW(), NOW(), :user_id, :message_id)"
    query_data = {'comment': comment, 'user_id': session['user_id'], 'message_id': message_id}
    mysql.query_db(comments_query, query_data)
    return redirect('/wall')

@app.route('/delete_message', methods=['POST'])
def delete_message():
    #remove message row from the db by its id (which is passed in as hidden input)
    mysql.query_db("DELETE FROM messages WHERE messages.id = {}".format(request.form['message_id']))
    return redirect('/wall')

app.run(debug=True)
