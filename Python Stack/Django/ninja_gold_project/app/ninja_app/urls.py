from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^ninja$', views.index),
    url(r'^ninja/reset$', views.reset),
    url(r'^ninja/process_gold/(?P<location>.+$)', views.process_gold),
    url(r'^', views.root),
]