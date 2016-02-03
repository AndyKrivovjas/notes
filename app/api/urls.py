from django.conf.urls import url, include

from .api import UserList, UserDetail

user_urls = [
    url(r'^/(?P<username>[0-9a-zA-Z_-]+)$', UserDetail.as_view(), name='user-detail'),
    url(r'^$', UserList.as_view(), name='user-list')
]

urlpatterns = [
    url(r'^users', include(user_urls)),
]
