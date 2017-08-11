# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect

# Create your views here.
def index(request):
    if 'log' not in request.session.keys() or request.session['log'] == None:
        request.session['log'] = []
    print request.session['log']
    return render(request, 'session_words_app/index.html')

def add_word(request):
    style = request.POST['color']
    if 'bold' in request.POST.keys() and request.POST['bold']:
        style += ' bold'
    payload = {
        'entry': request.POST['word'],
        'style': style,
    }
    request.session['log'].append(payload)
    request.session.modified = True
    return redirect('/')

def clear(request):
    request.session.clear()
    return redirect('/')