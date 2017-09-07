# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from .models import Description, Course, Comment
from django.shortcuts import render, redirect, reverse
from django.contrib import messages

def index(request):
    setPST()
    context = {
        'courses': Course.objects.all(),
    }
    # courses = Course.objects.all()
    # for course in courses:
    #     print course.name
    return render(request, 'courses_app/index.html', context)

def default(request):
    return redirect(reverse('index'))

def create(request):
    if request.POST:
        CourseErrors = Course.objects.validate(request.POST)
        DescriptionErrors = Description.objects.validate(request.POST)
        if CourseErrors:
            displayErrors(request, CourseErrors)
        if DescriptionErrors:
            displayErrors(request, DescriptionErrors)
        newDescription = Description.objects.create(content=request.POST['description'])
        Course.objects.create(name=request.POST['name'], description=newDescription)
    return redirect(reverse('index'))

def remove(request, course_id):
    context = {
        'course': Course.objects.get(id=course_id),
    }
    return render(request, 'courses_app/remove.html', context)

def destroy(request, course_id):
    Course.objects.get(id=course_id).delete()
    return redirect(reverse('index'))

def create_comment(request, course_id):
    if request.POST:
        CommentErrors = Comment.objects.validate(request.POST)
        if CommentErrors:
            displayErrors(request, CommentErrors)
        Comment.objects.create(content=request.POST['comment'], course=Course.objects.get(id=course_id))
    return redirect(reverse('index'))


#diplays errors and redirects to home
def displayErrors(request, errorDict):
    for tag, error in errorDict.iteritems():
        messages.add_message(request, messages.ERROR, error, extra_tags=tag)
    return redirect(reverse('index'))

#sets time zone to pst
def setPST():
    import pytz
    from django.utils import timezone
    timezone.activate(pytz.timezone('US/Pacific'))