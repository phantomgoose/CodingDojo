# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, redirect, HttpResponse
from .forms import UploadFileForm
from os import getcwd

# Create your views here.
def root(request):
    return redirect('/upload')

def upload(request):
    return render(request, 'upload_app/index.html')

def upload_file(request):
    if request.POST:
        form = UploadFileForm(request.POST, request.FILES)
        path = getcwd() + '/apps/upload_app/uploads/' + request.FILES['file'].name
        with open(path, 'wb+') as destination:
            for chunk in request.FILES['file'].chunks():
                destination.write(chunk)

    return redirect('/upload')