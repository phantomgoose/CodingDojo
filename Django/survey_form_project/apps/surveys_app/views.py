# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect

# Create your views here.
def index(request):
    return render(request, 'surveys_app/index.html')

def root_redirect(request):
    return redirect('/surveys')

def process(request):
    if 'counter' not in request.session.keys():
        request.session['counter'] = 0
    request.session['counter'] += 1
    print '*'*50
    print request.POST
    request.session['name'] = request.POST['name']
    request.session['location'] = request.POST['location']
    request.session['language'] = request.POST['language']
    request.session['comment'] = request.POST['comment']
    return redirect('/result')

def result(request):
    return render(request, 'surveys_app/result.html')