from django.contrib import messages
from .models import User, Message, Comment
from django.shortcuts import redirect, reverse

# sets current time zone to PST
def setPST():
    import pytz
    from django.utils import timezone
    timezone.activate(pytz.timezone('US/Pacific'))

#displays all errors passed
def flashErrors(request, errors, tags):
    for error in errors:
        messages.add_message(request, messages.ERROR, error, extra_tags=tags)

#displays all messages passed
def flashMessages(request, content, tags):
    for message in content:
        messages.add_message(request, messages.INFO, message, extra_tags=tags)

#Runs a validation method on POST data. Adds error messages to the queue and returns True, if there are no errors returns False
def checkAndDisplayErrors(request, validationMethod, tag, **kwargs):
    errors = validationMethod(request.POST, **kwargs)
    if errors:
        flashErrors(request, errors.values(), tag)
        return True
    return False

#Validates POST request and creates a new user based on it, returns user's id and success/fail result. If the user was created by an admin, flash a success message
def registerUser(request, byAdmin=False):
    result = {
        'registered': False,
        'user_id': -1,
    }
    if not checkAndDisplayErrors(request, User.objects.validate, 'registration'):
        user = User.objects.create(request.POST)
        result['registered'] = True
        result['user_id'] = user.id
        if byAdmin:
            flashMessages(request, ['Successfully added user'], 'notification')
    return result

#removes a user by id. Exceptions are handled in views
def deleteUser(request, user_id):
    User.objects.get(id=user_id).delete()
    flashMessages(request, ['Successfully deleted user'], 'notification')

#validates login info (pw/email)
def verifyLogin(request):
    if checkAndDisplayErrors(request, User.objects.validate_login, 'login'):
        return False
    return True

#logs the user in (ie stores their info in session). Request is validated in views
def login(request):
    user = User.objects.get(email=request.POST['email'])
    request.session['user_id'] = user.id
    request.session['logged_in'] = True
    request.session['user_level'] = user.user_level

#destroys session
def logout(request):
    request.session.flush()

#decorator that returns the passed function back to the caller if the user is logged in, otherwise returns a redirect back to the users page. Attaches to Views methods
def login_required(func):
    def wrapper(request, *args, **kwargs):
        if 'logged_in' in request.session.keys() and request.session['logged_in']:
            return func(request, *args, **kwargs)
        #could redirect silently for better new user experience
        flashMessages(request, ['You must be logged in to access this resource'], 'notification')
        return redirect(reverse('users-register'))
    return wrapper

#decorator that returns the passed function back to the caller if the user is logged in AND is an admin, otherwise returns a redirect back to the users page. Attaches to Views methods
def admin_required(func):
    def wrapper(request, *args, **kwargs):
        if 'logged_in' in request.session.keys() and request.session['logged_in'] and request.session['user_level'] == 9:
            return func(request, *args, **kwargs)
        flashMessages(request, ['You must be logged in as an admin to access this resource'], 'notification')
        return redirect(reverse('users-register'))
    return wrapper

#lets an admin update a user's profile. Passes parameters to the validation method that specify what the validator should look for in the POST request
def adminUpdateProfile(request, user_id):
    options = {'forProfileUpdate': True, 'forPasswordUpdate': False, 'forDescriptionUpdate': False, 'forLevelUpdate': True, 'ignoreDupeEmail': True}
    if not checkAndDisplayErrors(request, User.objects.validate, 'profile-update', **options):
        user = User.objects.get(id=user_id)
        user.updateProfile(request.POST)
        user.updateLevel(request.POST)
        flashMessages(request, ['Successfully updated user'], 'notification')

#lets an admin update a user's profile. Passes parameters to the validation method that specify what the validator should look for in the POST request
def adminUpdatePassword(request, user_id):
    options = {'forProfileUpdate': False, 'forPasswordUpdate': True, 'forDescriptionUpdate': False}
    if not checkAndDisplayErrors(request, User.objects.validate, 'password-update', **options):
        User.objects.get(id=user_id).updatePassword(request.POST)
        flashMessages(request, ['Successfully updated user'], 'notification')

#lets a user update their profile. Passes parameters to the validation method that specify what the validator should look for in the POST request
def userUpdateProfile(request):
    options = {'forProfileUpdate': True, 'forPasswordUpdate': False, 'forDescriptionUpdate': False, 'ignoreDupeEmail': True}
    if not checkAndDisplayErrors(request, User.objects.validate, 'profile-update', **options):
        User.objects.get(id=request.session['user_id']).updateProfile(request.POST)
        flashMessages(request, ['Successfully updated profile'], 'notification')

#lets a user update their profile. Passes parameters to the validation method that specify what the validator should look for in the POST request
def userUpdateDescription(request):
    options = {'forProfileUpdate': False, 'forPasswordUpdate': False, 'forDescriptionUpdate': True}
    if not checkAndDisplayErrors(request, User.objects.validate, 'description-update', **options):
        User.objects.get(id=request.session['user_id']).updateDescription(request.POST)
        flashMessages(request, ['Successfully updated description'], 'notification')

#lets a user update their profile. Passes parameters to the validation method that specify what the validator should look for in the POST request
def userUpdatePassword(request):
    options = {'forProfileUpdate': False, 'forPasswordUpdate': True, 'forDescriptionUpdate': False}
    if not checkAndDisplayErrors(request, User.objects.validate, 'password-update', **options):
        User.objects.get(id=request.session['user_id']).updatePassword(request.POST)
        flashMessages(request, ['Successfully updated password'], 'notification')

#creates a message on a user's page
def userCreateMessage(request, user_id):
    if not checkAndDisplayErrors(request, Message.objects.validate_message,'message'):
        for_user = User.objects.get(id=user_id)
        from_user = User.objects.get(id=request.session['user_id'])
        Message.objects.create(request.POST, from_user, for_user)

#creates a comment for a particular message
def userCreateComment(request, message_id):
    #message id is set as the error message's extra tag (if there are errors), so that the view can render errors for that particular message when posting comments
    if not checkAndDisplayErrors(request, Comment.objects.validate_comment, message_id):
        from_user = User.objects.get(id=request.session['user_id'])
        message = Message.objects.get(id=message_id)
        Comment.objects.create(request.POST, from_user, message)

#generates context for user profile pages
def getUserPage(request, user_id):
    user = User.objects.get(id=user_id)
    user_messages = Message.objects.filter(for_user=user).order_by('-created_at')
    context = {
        'user': user,
        'user_messages': user_messages,
    }
    return context