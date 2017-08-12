from django.conf.urls import url
from django.conf import settings
from . import views
from django.views.static import serve

urlpatterns = [
    url(r'^check_pic$', views.check_picture),
    url(r'^file_upload$', views.file_upload),
    url(r'^uploads/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT,
    }),
    url(r'^remote_file_upload$', views.get_remote_pic),
    url(r'^', views.index),
]