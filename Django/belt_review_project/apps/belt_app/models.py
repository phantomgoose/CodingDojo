# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import re
from django.db import models
from django.core.exceptions import ObjectDoesNotExist
import bcrypt

EMAIL_REGEX = re.compile('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')
PASSWORD_REGEX = re.compile('^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$')

class UserManager(models.Manager):
    def validate_registration(self, postData):
        errors = {}
        if len(postData['name']) < 2 or not all(w.isalpha() for w in postData['name'].split()):
            errors['name'] = 'Name must be at least 2 characters long and contain letters and spaces only'
        if len(postData['alias']) < 2 or not postData['alias'].isalpha():
            errors['alias'] = 'Alias must be at least 2 characters long and contain letters only'
        if not EMAIL_REGEX.match(postData['email']):
            errors['email'] = 'Invalid email'
        if not PASSWORD_REGEX.match(postData['password']):
            errors['password'] = 'Password must contain at least one lower case and one upper case letter, at least one number, at least one symbol ($@!%*#?&), and be at least 8 characters long'
        if not postData['password'] == postData['cpassword']:
            errors['cpassword'] = "Confirmation password doesn't match"
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
    name = models.CharField(max_length=255)
    alias = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = UserManager()

class Author(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, related_name='authors')

class Book(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, related_name='books')
    author = models.ForeignKey(Author, related_name='books')

class Review(models.Model):
    score = models.IntegerField()
    content = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, related_name='reviews')
    book = models.ForeignKey(Book, related_name='reviews')