# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class CourseManager(models.Manager):
    def validate(self, postData):
        errors = {}
        if len(postData['name']) < 11:
            errors['name'] = 'Course name must be at least 11 characters long'
        return errors

class DescriptionManager(models.Manager):
    def validate(self, postData):
        errors = {}
        if len(postData['description']) < 16:
            errors['description'] = 'Description must be at least 16 characters long'
        return errors

class CommentManager(models.Manager):
    def validate(self, postData):
        errors = {}
        if len(postData['comment']) < 10:
            errors['comment'] = 'Comment must be at least 10 characters long'
        return errors

class Description(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = DescriptionManager()

class Course(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    description = models.OneToOneField(Description)
    objects = CourseManager()

class Comment(models.Model):
    content = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    course = models.ForeignKey(Course, related_name='comments')
    objects = CommentManager()