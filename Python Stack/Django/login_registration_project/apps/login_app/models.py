# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import re
from datetime import datetime
from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.utils.datastructures import MultiValueDictKeyError
from dateutil.relativedelta import relativedelta
from dateutil import parser
import bcrypt

EMAIL_REGEX = re.compile('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')
PASSWORD_REGEX = re.compile('^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$')

class UserManager(models.Manager):
    def validate_registration(self, postData):
        errors = {}
        if len(postData['first_name']) < 2 or not postData['first_name'].isalpha():
            errors['first_name'] = 'First name must be at least 2 characters long and contain letters only'
        if len(postData['last_name']) < 2 or not postData['last_name'].isalpha():
            errors['last_name'] = 'Last name must be at least 2 characters long and contain letters only'
        if not EMAIL_REGEX.match(postData['email']):
            errors['email'] = 'Invalid email'
        if not PASSWORD_REGEX.match(postData['password']):
            errors['password'] = 'Password must contain at least one lower case and one upper case letter, at least one number, at least one symbol, and be at least 8 characters long'
        if not postData['password'] == postData['cpassword']:
            errors['cpassword'] = "Confirmation password doesn't match"
        #check bday validity
        #this one should never happen unless user fiddles with the html form, but still
        try:
            birthday = parser.parse(postData['birthday'])
        except (ValueError, MultiValueDictKeyError):
            errors['birthday'] = 'Invalid birthday date'
            #return errors right away, so that we don't hit issues with comparing dates later (though we could also set bday to something arbitrary or catch the exception on next line and adjust error message)
            return errors
        #check that the user is at least 13 years old
        if relativedelta(datetime.now(), datetime.combine(birthday, datetime.min.time())).years < 13:
            errors['birthday'] = 'You must be at least 13 years old to register'
        #make sure user isn't created already
        try:
            if User.objects.get(email=postData['email']):
                errors['email'] = 'A user with this email already exists'
        except ObjectDoesNotExist:
            print 'Email is not in the database, can proceed with registration'
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

class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    birthday = models.DateTimeField()
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    objects = UserManager()