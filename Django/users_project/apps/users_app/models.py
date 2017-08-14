# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.core.exceptions import ValidationError
import re

EMAIL_REGEX = re.compile('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')

# Create your models here.

def validate(first_name, last_name, email_address, age):
    if len(str(first_name)) < 2:
        raise ValidationError('First name must be at least 2 characters long')
    if len(str(last_name)) < 2:
        raise ValidationError('Last name must be at least 2 characters long')
    if not EMAIL_REGEX.match(str(email_address)):
        raise ValidationError('Invalid email address')
    if age < 1:
        raise ValidationError('Age must be at least 1')

class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email_address = models.CharField(max_length=255)
    age = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        validate(self.first_name, self.last_name, self.email_address, self.age)
