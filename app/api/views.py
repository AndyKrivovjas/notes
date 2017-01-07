from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from oauth2_provider.ext.rest_framework import TokenHasScope, OAuth2Authentication


class Ping(APIView):

    authentication_classes = [OAuth2Authentication]
    permission_classes = [permissions.IsAuthenticated, TokenHasScope, ]
    required_scopes = []

    def get(self, request):
        return Response()
