from django.conf.urls import url, include
from .views import TagList, TagDetail

urlpatterns = [
    url(r'^/([0-9a-zA-Z_-]+)$', TagDetail.as_view(), name='tag-detail'),
    url(r'^$', TagList.as_view(), name='tag-list')
]