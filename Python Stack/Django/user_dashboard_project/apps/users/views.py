# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, redirect, reverse
from django.views.generic import View
from django.utils.decorators import method_decorator
from django.core.exceptions import ObjectDoesNotExist
from .functions import *

#main page
class UsersIndex(View):
    def get(self, request):
        return render(request, 'users_app/users_index.html')

#registration page (post creates a new user)
class UsersRegister(View):
    def get(self, request):
        return render(request, 'users_app/users_register.html')

    def post(self, request):
        if registerUser(request)['registered']:
            login(request)
            return redirect(reverse('dashboard-index'))
        return redirect(reverse('users-register'))

class UsersLogout(View):
    def get(self, request):
        logout(request)
        return redirect(reverse('users-index'))

#login page (post logs the user in)
class UsersLogin(View):
    def get(self, request):
        return render(request, 'users_app/users_login.html')

    def post(self, request):
        if not verifyLogin(request):
            return redirect(reverse('users-login'))
        login(request)
        return redirect(reverse('dashboard-index'))

#displays a user's profile
class UsersShow(View):
    @method_decorator(login_required)
    def get(self, request, user_id):
        try:
            return render(request, 'users_app/users_show.html', getUserPage(request, user_id))
        except ObjectDoesNotExist as e:
            print (type(e), e.message)
            return redirect(reverse('users-index'))

#main redirect for all uncaught urls
class UsersRedirect(View):
    def get(self, request):
        return redirect(reverse('users-index'))

#post method for creating a message for a user's profile
class UsersCreateMessage(View):
    @method_decorator(login_required)
    def post(self, request, user_id):
        userCreateMessage(request, user_id)
        return redirect(reverse('users-show', kwargs={'user_id': user_id}))

#post method for creating a comment for a particular message
class UsersCreateComment(View):
    @method_decorator(login_required)
    def post(self, request, user_id, message_id):
        userCreateComment(request, message_id)
        return redirect(reverse('users-show', kwargs={'user_id': user_id}))

#gets a page where the user can edit their own profile
class UsersEdit(View):
    @method_decorator(login_required)
    def get(self, request):
        return render(request, 'users_app/users_edit.html', { 'user': User.objects.get(id=request.session['user_id']) })

#lets an admin view and manipulate other users' profiles
class UsersAdmin(View):
    @method_decorator(admin_required)
    def get(self, request, user_id):
        try:
            return render(request, 'users_app/users_admin.html', { 'user': User.objects.get(id=user_id) })
        except ObjectDoesNotExist as e:
            print (type(e), e.message)
            return redirect(reverse('users-index'))

    @method_decorator(admin_required)
    def post(self, request, user_id):
        if request.POST['action'] == 'profile':
            adminUpdateProfile(request, user_id)
        if request.POST['action'] == 'password':
            adminUpdatePassword(request, user_id)
        return redirect(reverse('users-admin', kwargs={'user_id': user_id}))
    
#lets a user update their own profile
class UsersUpdate(View):
    @method_decorator(login_required)
    def post(self, request):
        if request.POST['action'] == 'profile':
            userUpdateProfile(request)
        if request.POST['action'] == 'password':
            userUpdatePassword(request)
        if request.POST['action'] == 'description':
            userUpdateDescription(request)
        return redirect(reverse('users-edit'))

#page for creating a new user by admin, post creates the user
class UsersNew(View):
    @method_decorator(admin_required)
    def get(self, request):
        return render(request, 'users_app/users_new.html')

    @method_decorator(admin_required)
    def post(self, request):
        results = registerUser(request, byAdmin=True)
        if results['registered']:
            return redirect(reverse('users-show', kwargs={'user_id': results['user_id']}))
        return redirect(reverse('users-new'))

#lets an admin destroy the user by id
class UsersDestroy(View):
    @method_decorator(admin_required)
    def get(self, request, user_id):
        try:
            deleteUser(request, user_id)
            return redirect(reverse('dashboard-index'))
        except ObjectDoesNotExist as e:
            print (type(e), e.message)
            return redirect(reverse('users-index'))