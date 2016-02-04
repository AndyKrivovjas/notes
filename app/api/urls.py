from django.conf.urls import url, include

urlpatterns = [
    url(r'^users', include('app.users.urls')),
    url(r'^category', include('app.category.urls')),
]
