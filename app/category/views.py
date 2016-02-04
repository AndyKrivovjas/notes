from app.api.errors import Error
from .models import Category
from .serializers import CategorySerializer
from .permissions import CategoryPermissions
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from oauth2_provider.ext.rest_framework import TokenHasReadWriteScope, TokenHasScope, OAuth2Authentication


class CategoryList(APIView):

    authentication_classes = [OAuth2Authentication]
    permission_classes = [permissions.IsAuthenticated, TokenHasScope, ]
    required_scopes = ['category']

    def get(self, request, format=None):
        category = Category.objects.filter(owner=request.user)
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.add(request.user, request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetail(APIView):

    authentication_classes = [OAuth2Authentication]
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope, ]
    required_scopes = ['category']

    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        category = self.get_object(pk)
        category = CategorySerializer(category)
        print category
        if CategoryPermissions.has_object_permission(request, category.data):
            return Response(category.data)
        return Response(Error.RESPONSE_101_NO_PERMISSION, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        category = self.get_object(pk)
        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            if CategoryPermissions.has_object_permission(request, serializer.data):
                serializer.update(category, serializer.validated_data)
                return Response(serializer.data)
            return Response(Error.RESPONSE_101_NO_PERMISSION, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        category = self.get_object(pk)
        serializer = CategorySerializer(category)
        if category:
            if CategoryPermissions.has_object_permission(request, serializer.data):
                category.delete()
                return Response(serializer.data)
            return Response(Error.RESPONSE_101_NO_PERMISSION, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_204_NO_CONTENT)
