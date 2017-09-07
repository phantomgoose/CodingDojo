# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, HttpResponse, redirect
from django.utils.crypto import get_random_string

# Create your views here.

def generateWord():
    return get_random_string(length=14)

#technicaly should have split out the session and random word generation into its own route and redirected back to index, but whatevs
def index(request):
    if 'counter' not in request.session.keys():
        request.session['counter'] = 0
    if request.method == 'POST':
        request.session['counter'] += 1
        context = {
            'attempt_count': request.session['counter'],
            'random_word': generateWord(),
        }
        return render(request, 'random_word_app/index.html', context)
    else:
        context = {
            'attempt_count': request.session['counter'],
            'random_word': '',
        }
        return render(request, 'random_word_app/index.html', context)

def reset(request):
    request.session['counter'] = 0
    return redirect('/')