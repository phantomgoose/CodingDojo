# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, HttpResponse, redirect

# Create your views here.
def index(request):
    return HttpResponse("placeholder to later display a list of all the blogs.")

def new(request):
    return HttpResponse("placeholder to display a new form to create a new blog")

def create(request):
    return redirect("/blogs")

def show(request, id):
    return HttpResponse("placeholder to display blog {}".format(id))

def edit(request, id):
    return HttpResponse("placeholder to edit blog {}".format(id))

def destroy(request, id):
    return redirect("/blogs")