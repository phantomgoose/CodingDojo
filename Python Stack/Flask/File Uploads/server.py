import os
from flask import Flask, request, render_template, redirect, flash
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'D:/Dropbox/coding dojo/DojoAssignments/Python/flask_fundamentals/File Uploads/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = '123'

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/result', methods=['POST'])
def result():
    if 'fileupload' not in request.files:
        flash('No file')
        return redirect('/')
    file = request.files['fileupload']
    print file
    if file.filename == '':
        flash('No file')
        return redirect('/')
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash('File successfully uploaded')
        return redirect ('/')
    return redirect('/')

app.run(debug=True)