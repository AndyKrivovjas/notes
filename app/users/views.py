from app.api.errors import Error
from rest_framework.parsers import JSONParser
from .models import User
from .serializers import UserSerializer
from .permissions import UserPermissions
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from oauth2_provider.ext.rest_framework import TokenHasReadWriteScope, TokenHasScope, OAuth2Authentication


class UserList(APIView):
    # List all users, or create a new user.

    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    required_scopes = []

    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.register(request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    # Retrieve, update or delete a user instance.

    authentication_classes = [OAuth2Authentication]
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    required_scopes = ['users']

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        user = UserSerializer(user)
        if UserPermissions.is_owner(request, user):
            return Response(user.data)
        return Response(Error.RESPONSE_101_NO_PERMISSION, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            if UserPermissions.is_owner(request, serializer):
                serializer.update(user, serializer.validated_data)
                return Response(serializer.data)
            return Response(Error.RESPONSE_101_NO_PERMISSION, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request, pk, format=None):
    #     user = self.get_object(pk)
    #     user.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
