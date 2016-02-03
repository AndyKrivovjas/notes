from django.conf.urls import include, url
from django.conf import settings

from django.views.generic import TemplateView

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from rest_framework import routers

admin.autodiscover()


# class SimpleStaticView(TemplateView):
#     def get_template_names(self):
#         return [self.kwargs.get('template_name') + ".html"]
#
#     def get(self, request, *args, **kwargs):
#         from django.contrib.auth import authenticate, login
#         if request.user.is_anonymous():
#             # Auto-login the User for Demonstration Purposes
#             user = authenticate()
#             login(request, user)
#         return super(SimpleStaticView, self).get(request, *args, **kwargs)

router = routers.DefaultRouter()

urlpatterns = [
    # url(r'^', include(router.urls)),
    url(r'^api/', include('app.api.urls')),
    url(r'^o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    url(r'^accounts/login/$', 'django.contrib.auth.views.login',
       {'template_name': 'admin/login.html'}),
    url(r'^accounts/logout/$', 'django.contrib.auth.views.logout'),
    url(r'^admin/', include(admin.site.urls)),
    # url(r'^(?P<template_name>\w+)$', SimpleStaticView.as_view(), name='app'),
    url(r'^$', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    from django.views.static import serve
    urlpatterns += [
        url(r'^(?P<path>favicon\..*)$', serve, {'document_root': settings.STATIC_ROOT}),
        url(r'^%s(?P<path>.*)$' % settings.MEDIA_URL[1:], serve, {'document_root': settings.MEDIA_ROOT}),
        url(r'^%s(?P<path>.*)$' % settings.STATIC_URL[1:], serve, dict(insecure=True)),
    ]
