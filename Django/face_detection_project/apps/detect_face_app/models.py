# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import os
from django.db import models
from .forms import UploadFileForm
import urllib

ENV_PATH = os.path.abspath(os.path.dirname(__file__))
IMG_LOCATION = ENV_PATH + '/uploads/image.png'

# handles uploading images, quite definitely insecure
def uploadFile(request):
    form = UploadFileForm(request.POST, request.FILES)
    if request.POST and request.FILES and validExtension(request.FILES['file'].name):
        with open(IMG_LOCATION, 'wb+') as destination:
            for chunk in request.FILES['file'].chunks():
                destination.write(chunk)

# even less secure file upload method with pretty much no validation
def uploadFileByUrl(url):
    if not url:
        return
    file = urllib.URLopener()
    file.retrieve(url, IMG_LOCATION)

#checks if the extension is legit
def validExtension(file_name):
    if not file_name.endswith('.png'):
        return False
    return True