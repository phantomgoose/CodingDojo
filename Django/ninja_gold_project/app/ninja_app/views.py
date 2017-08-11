# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, redirect
import models

#if someone lands on anything other than /ninja, redirect them to /ninja
def root(request):
    return redirect('/ninja')

def index(request):
    return render(request, 'ninja_app/index.html')

#performs logic after hitting a button
def process_gold(request, location):
    if request.POST:
        models.generateGold(request, location)
    return redirect('/ninja')
    

#resets session, but only if the button was clicked (generating a post request)
def reset(request):
    if request.POST:
        models.reset(request)
    return redirect('/ninja')