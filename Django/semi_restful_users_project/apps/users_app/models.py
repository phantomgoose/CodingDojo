# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import re
from django.db import models

EMAIL_REGEX = re.compile('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')

class UserManager(models.Manager):
    def validate(self, postData):
        errors = {}
        if len(postData['first_name']) < 2:
            errors['first_name'] = 'First name must be at least 2 characters long'
        if len(postData['last_name']) < 2:
            errors['last_name'] = 'Last name must be at least 2 characters long'
        if not postData['first_name'].isalpha():
            errors['first_name'] = 'First name must only contain letters'
        if not postData['last_name'].isalpha():
            errors['last_name'] = 'Last name must only contain letters'
        if not EMAIL_REGEX.match(postData['email']):
            errors['email'] = 'Invalid email address'
        return errors


class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    users = UserManager()