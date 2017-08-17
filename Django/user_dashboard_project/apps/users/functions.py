from django.contrib import messages
from .models import User, Message, Comment
from django.shortcuts import redirect, reverse

# sets current time zone to PST

def setPST():
    import pytz
    from django.utils import timezone
    timezone.activate(pytz.timezone('US/Pacific'))

def flashErrors(request, errors, tags):
    for error in errors:
        messages.add_message(request, messages.ERROR, error, extra_tags=tags)

def flashMessages(request, content, tags):
    for message in content:
        messages.add_message(request, messages.INFO, message, extra_tags=tags)

# adds error messages to the queue and returns True, if there are no errors returns False

def checkAndDisplayErrors(request, validationMethod, tag, **kwargs):
    errors = validationMethod(request.POST, **kwargs)
    if errors:
        flashErrors(request, errors.values(), tag)
        return True
    return False

def registerUser(request, byAdmin=False):
    result = {
        'registered': False,
        'user_id': -1,
    }
    if not checkAndDisplayErrors(request, User.objects.validate_registration, 'registration'):
        user = User.objects.create(request.POST)
        result['registered'] = True
        result['user_id'] = user.id
        if byAdmin:
            flashMessages(request, ['Successfully added user'], 'notification')
    return result

def deleteUser(request, user_id):
    User.objects.get(id=user_id).delete()
    flashMessages(request, ['Successfully deleted user'], 'notification')

def verifyLogin(request):
    if checkAndDisplayErrors(request, User.objects.validate_login, 'login'):
        return False
    return True

def login(request):
    user = User.objects.get(email=request.POST['email'])
    request.session['user_id'] = user.id
    request.session['logged_in'] = True
    request.session['user_level'] = user.user_level

def logout(request):
    request.session.flush()

def login_required(func):
    def wrapper(request, *args, **kwargs):
        if 'logged_in' in request.session.keys() and request.session['logged_in']:
            return func(request, *args, **kwargs)
        #could redirect silently for better new user experience
        flashMessages(request, ['You must be logged in to access this resource'], 'notification')
        return redirect(reverse('users-register'))
    return wrapper

def admin_required(func):
    def wrapper(request, *args, **kwargs):
        if 'logged_in' in request.session.keys() and request.session['logged_in'] and request.session['user_level'] == 9:
            return func(request, *args, **kwargs)
        flashMessages(request, ['You must be logged in as an admin to access this resource'], 'notification')
        return redirect(reverse('users-register'))
    return wrapper

def adminUpdateProfile(request, user_id):
    options = {'forProfileUpdate': True, 'forPasswordUpdate': False, 'forDescriptionUpdate': False, 'forLevelUpdate': True, 'ignoreDupeEmail': True}
    if not checkAndDisplayErrors(request, User.objects.validate_registration, 'profile-update', **options):
        user = User.objects.get(id=user_id)
        user.updateProfile(request.POST)
        user.updateLevel(request.POST)
        flashMessages(request, ['Successfully updated user'], 'notification')

def adminUpdatePassword(request, user_id):
    options = {'forProfileUpdate': False, 'forPasswordUpdate': True, 'forDescriptionUpdate': False}
    if not checkAndDisplayErrors(request, User.objects.validate_registration, 'password-update', **options):
        User.objects.get(id=user_id).updatePassword(request.POST)
        flashMessages(request, ['Successfully updated user'], 'notification')

def userUpdateProfile(request):
    options = {'forProfileUpdate': True, 'forPasswordUpdate': False, 'forDescriptionUpdate': False, 'ignoreDupeEmail': True}
    if not checkAndDisplayErrors(request, User.objects.validate_registration, 'profile-update', **options):
        User.objects.get(id=request.session['user_id']).updateProfile(request.POST)
        flashMessages(request, ['Successfully updated profile'], 'notification')

def userUpdateDescription(request):
    options = {'forProfileUpdate': False, 'forPasswordUpdate': False, 'forDescriptionUpdate': True}
    if not checkAndDisplayErrors(request, User.objects.validate_registration, 'description-update', **options):
        User.objects.get(id=request.session['user_id']).updateDescription(request.POST)
        flashMessages(request, ['Successfully updated description'], 'notification')

def userUpdatePassword(request):
    options = {'forProfileUpdate': False, 'forPasswordUpdate': True, 'forDescriptionUpdate': False}
    if not checkAndDisplayErrors(request, User.objects.validate_registration, 'password-update', **options):
        User.objects.get(id=request.session['user_id']).updatePassword(request.POST)
        flashMessages(request, ['Successfully updated password'], 'notification')

def userCreateMessage(request, user_id):
    if not checkAndDisplayErrors(request, Message.objects.validate_message,'message'):
        for_user = User.objects.get(id=user_id)
        from_user = User.objects.get(id=request.session['user_id'])
        Message.objects.create(request.POST, from_user, for_user)

def userCreateComment(request, message_id):
    #message id is set as the message's extra tag, so that the view can render errors for that particular message when posting comments
    if not checkAndDisplayErrors(request, Comment.objects.validate_comment, message_id):
        from_user = User.objects.get(id=request.session['user_id'])
        message = Message.objects.get(id=message_id)
        Comment.objects.create(request.POST, from_user, message)

def getUserPage(request, user_id):
    user = User.objects.get(id=user_id)
    user_messages = Message.objects.filter(for_user=user).order_by('-created_at')
    context = {
        'user': user,
        'user_messages': user_messages,
    }
    return context