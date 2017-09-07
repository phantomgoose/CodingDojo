# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, redirect, reverse
from .models import User
from django.contrib import messages
import bcrypt

# Create your views here.
def index(request):
    return render(request, 'login_app/index.html')

def register(request):
    if request.POST:
        errors = User.objects.validate_registration(request.POST)
        if errors:
            for error in errors.itervalues():
                messages.add_message(request, messages.ERROR, error, extra_tags='registration')
            return redirect('/')
        hashedpw = bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt())
        User.objects.create(first_name=request.POST['first_name'], last_name=request.POST['last_name'], birthday=request.POST['birthday'], email=request.POST['email'], password=hashedpw)
        request.session['name'] = User.objects.get(email=request.POST['email']).first_name
        return redirect(reverse('success'))
    return redirect('/')

def login(request):
    if request.POST:
        errors = User.objects.validate_login(request.POST)
        if errors:
            for error in errors.itervalues():
                messages.add_message(request, messages.ERROR, error, extra_tags='login')
            return redirect('/')
        request.session['name'] = User.objects.get(email=request.POST['email']).first_name
        return redirect(reverse('success'))
    return redirect('/')

def success(request):
    #make sure user is actually logged in when visiting this page (pretty bootleg method, but better than nothing eh)
    if 'name' in request.session.keys():
        return render(request, 'login_app/success.html')
    return redirect('/')

def logout(request):
    request.session.clear()
    return redirect('/')