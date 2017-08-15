from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^users$', views.index, name='index'),
    url(r'^users/new$', views.new, name='new_user'),
    url(r'^users/(?P<id>\d*)$', views.show, name='show_user'),
    url(r'^users/(?P<id>\d*)/edit$', views.edit, name='edit_user'),
    url(r'^users/create$', views.create, name='create_user'),
    url(r'^users/(?P<id>\d*)/destroy$', views.destroy, name='delete_user'),
    url(r'^', views.root, name='root'),
]