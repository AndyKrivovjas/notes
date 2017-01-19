import json

from app.api.errors import Error
from .models import User
from .serializers import UserSerializer, UserScopeSerializer, UserSerializerView, UserRestoreSerializer
from .permissions import UserPermissions
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from oauth2_provider.ext.rest_framework import TokenHasReadWriteScope, TokenHasScope, OAuth2Authentication


class ScopeDetail(APIView):
    # List all users, or create a new user.

    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    required_scopes = []

    def get(self, request, format=None):
        user = User.objects.filter(username=request.GET.get('username'))
        serializer = UserScopeSerializer(user, many=True)
        if len(serializer.data):
            response = Response(serializer.data[0])
        else:
            error = Error.RESPONSE_103_USER_DOESNT_EXIST[0]
            error = {'username': [error['error_message'].format(request.GET.get('username'))]}
            response = Response(error, status=status.HTTP_400_BAD_REQUEST)
        return response


class UserList(APIView):
    # List all users, or create a new user.

    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    required_scopes = []

    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializerView(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print request.data
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.register(request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RestorePassword(APIView):
    # List all users, or create a new user.

    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    required_scopes = []

    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializerView(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserRestoreSerializer(request.data)
        print request.data
        serializer.sendEmail(request.data.get('email'))
        return Response(request.data)


class UserDetail(APIView):

    authentication_classes = [OAuth2Authentication]
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope, ]
    required_scopes = ['users']

    def get(self, request):
        user = UserSerializerView(request.user)
        if UserPermissions.is_owner(request, user):
            return Response(user.data)
        return Response(Error.RESPONSE_101_NO_PERMISSION, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            if UserPermissions.is_owner(request, serializer):
                serializer.update(user, serializer.validated_data)
                return Response(serializer.data)
            return Response(Error.RESPONSE_101_NO_PERMISSION, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

