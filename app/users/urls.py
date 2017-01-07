from django.conf.urls import url, include
from .views import UserList, UserDetail

urlpatterns = [
    url(r'^/$', UserDetail.as_view(), name='user-detail'),
    url(r'^s/$', UserList.as_view(), name='user-list')
]