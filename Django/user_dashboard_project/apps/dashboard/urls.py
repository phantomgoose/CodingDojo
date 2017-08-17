from django.conf.urls import url
from .views import DashboardRedirect, DashboardIndex

urlpatterns = [
    url(r'^$', DashboardIndex.as_view(), name='dashboard-index'),    
    url(r'^', DashboardRedirect.as_view(), name='dashboard-redirect'),
]