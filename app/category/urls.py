from django.conf.urls import url, include
from .views import CategoryList, CategoryDetail

urlpatterns = [
    url(r'^y/(?P<pk>[0-9a-zA-Z_-]+)$', CategoryDetail.as_view(), name='category-detail'),
    url(r'^ies/$', CategoryList.as_view(), name='category-list')
]