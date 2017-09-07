# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from .models import User
from django.shortcuts import render, redirect, reverse
from django.contrib import messages

#force set tz to PST, in lieu if implementing a more complicated method
def setPST():
    from django.utils import timezone
    import pytz
    timezone.activate(pytz.timezone('US/Pacific'))

# Create your views here.
def index(request):
    setPST()
    context = {
        'users': User.users.all(),
    }
    return render(request, 'users_app/index.html', context)

def show(request, id):
    setPST()
    if not request.POST:
        context = {
            'id': id,
            'full_name': User.users.get(id=id).first_name + ' ' + User.users.get(id=id).last_name,
            'email': User.users.get(id=id).email,
            'created_at': User.users.get(id=id).created_at
        }
        return render(request, 'users_app/show_user.html', context)
    else:
        errors = User.users.validate(request.POST)
        if len(errors) > 0:
            for tag, error in errors.iteritems():
                messages.add_message(request, messages.ERROR, error, extra_tags=tag)
                return redirect(reverse('edit_user', kwargs={'id': id}))
        u = User.users.get(id=id)
        u.first_name = request.POST['first_name']
        u.last_name = request.POST['last_name']
        u.email = request.POST['email']
        u.save()
        return redirect(reverse('show_user', kwargs={'id': id}))

def root(request):
    return redirect(reverse('index'))

def new(request):
    return render(request, 'users_app/new_user.html')

def edit(request, id):
    context = {
        'user': User.users.get(id=id),
    }
    return render(request, 'users_app/edit_user.html', context)

def create(request):
    if request.POST:
        errors = User.users.validate(request.POST)
        if len(errors) > 0:
            for tag, error in errors.iteritems():
                messages.add_message(request, messages.ERROR, error, extra_tags=tag)
            return redirect(reverse('new_user'))
        else:
            User.users.create(first_name=request.POST['first_name'], last_name=request.POST['last_name'], email=request.POST['email'])
    return redirect(reverse('index'))

def destroy(request, id):
    User.users.get(id=id).delete()
    return redirect(reverse('index'))