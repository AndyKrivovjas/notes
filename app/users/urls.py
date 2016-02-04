from django.conf.urls import url, include
from .views import UserList, UserDetail

urlpatterns = [
    url(r'^/([0-9a-zA-Z_-]+)$', UserDetail.as_view(), name='user-detail'),
    url(r'^$', UserList.as_view(), name='user-list')
]