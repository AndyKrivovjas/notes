from django.conf.urls import url, include
from .views import UserList, UserDetail, RestorePassword

urlpatterns = [
    url(r'^/$', UserDetail.as_view(), name='user-detail'),
    url(r'^/restore/$', RestorePassword.as_view(), name='user-restore'),
    url(r'^s/$', UserList.as_view(), name='user-list')
]