from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^courses$', views.index, name='index'),
    url(r'^courses/create$', views.create, name='create_course'),
    url(r'^courses/remove/(?P<course_id>\d*)$', views.remove, name='remove_course'),
    url(r'^courses/destroy/(?P<course_id>\d*)$', views.destroy, name='destroy_course'),
    url(r'^courses/create_comment/(?P<course_id>\d*)$', views.create_comment, name='create_comment'),
    url(r'^', views.default, name='default'),
]