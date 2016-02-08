from app.task.views import ColorList
from app.users.views import ScopeDetail
from django.conf.urls import url, include

urlpatterns = [
    url(r'^users', include('app.users.urls')),
    url(r'^category', include('app.category.urls')),
    url(r'^tag', include('app.tag.urls')),
    url(r'^task', include('app.task.urls')),
    url(r'^color', ColorList.as_view(), name='color-list'),
    url(r'^scope', ScopeDetail.as_view(), name='scope-detail')
]
