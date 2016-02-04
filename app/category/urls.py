from django.conf.urls import url, include
from .views import CategoryList, CategoryDetail

urlpatterns = [
    url(r'^/([0-9a-zA-Z_-]+)$', CategoryDetail.as_view(), name='category-detail'),
    url(r'^$', CategoryList.as_view(), name='category-list')
]