# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import re
from django.db import models
from django.core.exceptions import ObjectDoesNotExist
import bcrypt

EMAIL_REGEX = re.compile('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')
PASSWORD_REGEX = re.compile('^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$')

class UserManager(models.Manager):

    adminCreated = False

    def validate_registration(self, postData, forProfileUpdate=True, forPasswordUpdate=True, forDescriptionUpdate=False, ignoreDupeEmail=False, forLevelUpdate=False):
        errors = {}
        #validate keys
        if forProfileUpdate and not all(k in postData.keys() for k in ['first_name', 'last_name', 'email']):
            errors['multi'] = 'All fields are required'
            return errors
        if forPasswordUpdate and not all(k in postData.keys() for k in ['password', 'cpassword']):
            errors['multi'] = 'All fields are required'
            return errors
        if forDescriptionUpdate and not 'description' in postData.keys():
            errors['description'] = 'Description not provided'
            return errors
        if forLevelUpdate and not 'level' in postData.keys():
            errors['level'] = 'User level not provided'
            return errors
        #validate values
        if forProfileUpdate and (len(postData['first_name']) < 2 or not postData['first_name'].isalpha()):
            errors['first_name'] = 'First name must be at least 2 characters long and contain letters only'
        if forProfileUpdate and (len(postData['last_name']) < 2 or not postData['last_name'].isalpha()):
            errors['last_name'] = 'Last name must be at least 2 characters long and contain letters only'
        if forProfileUpdate and not EMAIL_REGEX.match(postData['email']):
            errors['email'] = 'Invalid email'
        if forPasswordUpdate and not PASSWORD_REGEX.match(postData['password']):
            errors['password'] = 'Password must contain at least one lower case and one upper case letter, at least one number, at least one symbol ($@!%*#?&), and be at least 8 characters long'
        if forPasswordUpdate and not postData['password'] == postData['cpassword']:
            errors['cpassword'] = "Confirmation password doesn't match"
        #make sure user isn't created already
        if not ignoreDupeEmail and forProfileUpdate and self.filter(email=postData['email']):
            errors['email'] = 'A user with this email already exists'
        #this might through an exception if description isnt entered when updating profile. Description should be either empty or at least 2 characters long
        if forDescriptionUpdate and len(postData['description']) < 2 and len(postData['description']) > 0:
            errors['description'] = 'Description must be at least 2 characters long'
        if forLevelUpdate and not postData['level'] in ('0', '9'):
            errors['level'] = 'Invalid user level'
        return errors

    def validate_login(self, postData):
        errors = {}
        #see if the email exists in the db and save the user if so
        try:
            user = User.objects.get(email=postData['email'])
        except ObjectDoesNotExist:
            errors['email/pw'] = 'Invalid email or password'
            return errors
        #check pw against db
        if not bcrypt.checkpw(postData['password'].encode(), user.password.encode()):
            errors['email/pw'] = 'Invalid email or password'
        return errors

    #assume we already validated the post data
    def create(self, postData):
        #initAdminFlag runs only if adminCreated is False (which it is by default). I assume it's better to check a boolean twice per user created than get a user.all.count() every time a user is created
        if not self.adminCreated:
            self.initAdminFlag()
        if not self.adminCreated:
            user_level = 9
            self.adminCreated = True
        else:
            user_level = 0
        hashedpw = bcrypt.hashpw(postData['password'].encode(), bcrypt.gensalt())
        #description is empty by default, since it's not created at registration
        return super(UserManager, self).create(first_name=postData['first_name'], last_name=postData['last_name'], email=postData['email'], description='', password=hashedpw, user_level=user_level)

    def initAdminFlag(self):
        if self.getUserCount() > 0:
            self.adminCreated = True
        else:
            self.adminCreated = False
    
    def getUserCount(self):
        return self.all().count()

class MessageManager(models.Manager):
    def validate_message(self, postData):
        errors = {}
        if 'message' not in postData.keys() or len(postData['message']) < 2:
            errors['message'] = 'Message must be at least 2 characters long'
        return errors

    def create(self, postData, from_user, for_user):
        super(MessageManager, self).create(content=postData['message'], from_user=from_user, for_user=for_user)

class CommentManager(models.Manager):
    def validate_comment(self, postData):
        errors = {}
        if 'comment' not in postData.keys() or len(postData['comment']) < 2:
            errors['comment'] = 'Comment must be at least 2 characters long'
        return errors

    def create(self, postData, from_user, message):
        super(CommentManager, self).create(content=postData['comment'], from_user=from_user, message=message)

class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=255)
    description = models.TextField(max_length=1000)
    password = models.CharField(max_length=255)
    user_level = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = UserManager()

    #these all assume we validated the post data already
    def updateProfile(self, postData):
        self.email = postData['email']
        self.first_name = postData['first_name']
        self.last_name = postData['last_name']
        self.save()

    def updateDescription(self, postData):
        self.description = postData['description']
        self.save()
    
    def updatePassword(self, postData):
        hashedpw = bcrypt.hashpw(postData['password'].encode(), bcrypt.gensalt())
        self.password = hashedpw
        self.save()
    
    def updateLevel(self, postData):
        self.user_level = postData['level']
        self.save()

class Message(models.Model):
    content = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    for_user = models.ForeignKey(User, related_name='messages_received')
    from_user = models.ForeignKey(User, related_name='messages_sent')
    objects = MessageManager()

class Comment(models.Model):
    content = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    from_user = models.ForeignKey(User, related_name='comments_sent')
    message = models.ForeignKey(Message, related_name='comments')
    objects = CommentManager()