from app.api.views import Ping
from app.task.views import ColorList
from app.users.views import ScopeDetail
from django.conf.urls import url, include

urlpatterns = [
    url(r'^user', include('app.users.urls')),
    url(r'^categor', include('app.category.urls')),
    url(r'^tag', include('app.tag.urls')),
    url(r'^task', include('app.task.urls')),
    url(r'^colors/', ColorList.as_view(), name='color-list'),
    url(r'^scope/', ScopeDetail.as_view(), name='scope-detail'),
    url(r'^ping/', Ping.as_view())
]
