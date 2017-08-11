# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.utils.crypto import get_random_string

# Create your models here.
COUNTER = 1

def getCounter():
    global COUNTER
    return COUNTER

def resetCounter():
    global COUNTER
    COUNTER = 1

def generateWord():
    global COUNTER
    COUNTER += 1
    return get_random_string(length=14)