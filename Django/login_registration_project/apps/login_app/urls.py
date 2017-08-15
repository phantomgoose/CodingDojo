from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^home$', views.index, name='index'),
    url(r'^home/register$', views.register, name='register'),
    url(r'^home/login$', views.login, name='login'),
    url(r'^home/logout$', views.logout, name='logout'),
    url(r'^home/success$', views.success, name='success'),
    url(r'^', views.index),
]