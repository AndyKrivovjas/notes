from django.conf.urls import url, include
from .views import TaskList, TaskDetail

urlpatterns = [
    url(r'^/([0-9a-zA-Z_-]+)$', TaskDetail.as_view(), name='task-detail'),
    url(r'^s/$', TaskList.as_view(), name='task-list')
]