# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, redirect, reverse
from .models import User, Book, Author, Review
from django.contrib import messages
import bcrypt
from django.utils import timezone
import pytz

def users_show(request, user_id):
    if not userIsLoggedIn(request):
        return redirect('/')
    user = User.objects.get(id=user_id)
    #gets unique book ids for the reviews user wrote
    unique_reviews = Review.objects.filter(user=user).values('book_id').distinct().values_list('book_id', flat=True)
    reviewed_books = Book.objects.filter(id__in=unique_reviews)
    context = {
        'user': user,
        'review_count': Review.objects.filter(user=user).count(),
        'reviewed_books': reviewed_books,
    }
    return render(request, 'belt_app/user.html', context)

#post
def register(request):
    if request.POST:
        errors = User.objects.validate_registration(request.POST)
        if errors:
            for error in errors.itervalues():
                messages.add_message(request, messages.ERROR, error, extra_tags='registration')
            return redirect('/')
        hashedpw = bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt())
        User.objects.create(name=request.POST['name'], alias=request.POST['alias'], email=request.POST['email'], password=hashedpw)
        user = User.objects.get(email=request.POST['email'])
        request.session['alias'] = user.alias
        request.session['user_id'] = user.id
        return redirect(reverse('books'))
    return redirect('/')

#post
def login(request):
    if request.POST:
        errors = User.objects.validate_login(request.POST)
        if errors:
            for error in errors.itervalues():
                messages.add_message(request, messages.ERROR, error, extra_tags='login')
            return redirect('/')
        user = User.objects.get(email=request.POST['email'])
        request.session['alias'] = user.alias
        request.session['user_id'] = user.id
        return redirect(reverse('books'))
    return redirect('/')

def books(request):
    if not userIsLoggedIn(request):
        return redirect('/')
    setPST()
    context = {
        'recent_reviews': Review.objects.all().order_by('-created_at')[:3],
        'books_with_reviews': Book.objects.raw('SELECT * FROM belt_app_book JOIN belt_app_review ON belt_app_review.book_id = belt_app_book.id GROUP BY belt_app_book.id'),
    }
    return render(request, 'belt_app/books.html', context)

def books_create_ui(request):
    if not userIsLoggedIn(request):
        return redirect('/')
    context = {
        'authors': Author.objects.all(),
    }
    return render(request, 'belt_app/add_book.html', context)

#post
def books_create(request):
    if userIsLoggedIn(request) and request.POST:
        #get our user
        user = User.objects.get(id=request.session['user_id'])
        #not adding validation for creatings books/reviews (not specified in assignment as required)
        #if we're adding a new author rather than selecting an existing one
        if request.POST['add_author']:
            author = Author.objects.create(name=request.POST['add_author'], user=user)
        else:
            author = Author.objects.get(id=request.POST['select_author'])
        book = Book.objects.create(title=request.POST['title'], user=user, author=author)
        Review.objects.create(score=request.POST['rating'], content=request.POST['review'], user=user, book=book)
        return redirect(reverse('books_show', kwargs={'book_id': book.id}))
    return redirect('/')

def books_show(request, book_id):
    if not userIsLoggedIn(request):
        return redirect('/')
    setPST()
    book = Book.objects.get(id=book_id)
    context = {
        'book': book,
        'reviews': Review.objects.filter(book=book).order_by('-created_at'),
    }
    return render(request, 'belt_app/show_book.html', context)

#post
def reviews_create(request):
    if userIsLoggedIn(request) and request.POST:
        book = Book.objects.get(id=request.POST['book_id'])
        user = User.objects.get(id=request.session['user_id'])
        Review.objects.create(score=request.POST['rating'], content=request.POST['review'], user=user, book=book)
        return redirect(reverse('books_show', kwargs={'book_id': request.POST['book_id']}))
    return redirect('/')

def reviews_delete(request, book_id, review_id):
    if userIsLoggedIn(request):
        Review.objects.get(id=review_id).delete()
        return redirect(reverse('books_show', kwargs={'book_id': book_id}))
    return redirect('/')

def logout(request):
    if userIsLoggedIn(request):
        request.session.clear()
    return redirect('/')

def index(request):
    if userIsLoggedIn(request, show_error=False):
        return redirect(reverse('books'))
    return render(request, 'belt_app/index.html')

#make sure user is actually logged in when visiting a page
def userIsLoggedIn(request, show_error=True):
    if not all(key in request.session.keys() for key in ('alias', 'user_id')):
        if show_error:
            messages.add_message(request, messages.ERROR, 'You need to be logged in to view this resource.', extra_tags='registration')
        return False
    return True

#sets time zone to PST to display our local time on timestamps instead of UTC
def setPST():
    timezone.activate(pytz.timezone('US/Pacific'))