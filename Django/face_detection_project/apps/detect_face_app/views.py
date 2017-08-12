# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, redirect
from .face_detect import findFaces
from .models import uploadFile, uploadFileByUrl

# Create your views here.
def index(request):
    return render(request, 'detect_face_app/index.html')

def file_upload(request):
    if request.POST:
        uploadFile(request)
    return redirect('/')

def check_picture(request):
    if request.POST:
        if findFaces(float(request.POST['scale_factor']), int(request.POST['min_neighbors']), (int(request.POST['min_size']), int(request.POST['min_size']))):
            request.session['faces_found'] = True
        else:
            request.session['faces_found'] = False
    return redirect('/')

#checks if the extension is legit
def validExtension(file_name):
    if not file_name.endswith('.png'):
        return False
    return True

def get_remote_pic(request):
    if request.POST:
        uploadFileByUrl(request.POST['url'])
    return redirect('/')