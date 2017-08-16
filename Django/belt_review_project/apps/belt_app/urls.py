from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^users/logout$', views.logout, name='logout'),
    url(r'^users/login$', views.login),
    url(r'^users/register$', views.register),
    url(r'^users/(?P<user_id>\d+)$', views.users_show, name='users_show'),
    url(r'^books$', views.books, name='books'),
    url(r'^books/add$', views.books_create_ui, name='books_add'),
    url(r'^books/show/(?P<book_id>\d+)$', views.books_show, name='books_show'),
    url(r'^books/create$', views.books_create),
    url(r'^reviews/create$', views.reviews_create),
    url(r'^books/(?P<book_id>\d+)/reviews/delete/(?P<review_id>\d+)$', views.reviews_delete),
    url(r'^', views.index, name='index'),
]