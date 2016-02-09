from app.api.errors import Error
from app.api.permissions import IsOwn
from .models import Tag
from .serializers import TagSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from oauth2_provider.ext.rest_framework import TokenHasReadWriteScope, TokenHasScope, OAuth2Authentication


class TagList(APIView):

    authentication_classes = [OAuth2Authentication]
    permission_classes = [permissions.IsAuthenticated, TokenHasScope, ]
    required_scopes = ['tag']

    def get(self, request, format=None):
        tag = Tag.objects.filter(owner=request.user.id)
        serializer = TagSerializer(tag, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            item = serializer.add(request.user, request.data)
            return Response(TagSerializer(item).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TagDetail(APIView):

    authentication_classes = [OAuth2Authentication]
    permission_classes = [permissions.IsAuthenticated, TokenHasScope, ]
    required_scopes = ['tag']

    def get_object(self, pk):
        try:
            return Tag.objects.get(pk=pk)
        except Tag.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        tag = self.get_object(pk)
        if IsOwn.has_object_permission(request, tag):
            tag = TagSerializer(tag)
            return Response(tag.data)
        return Response(Error.RESPONSE_101_NO_PERMISSION, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        tag = self.get_object(pk)
        serializer = TagSerializer(tag, data=request.data, partial=True)
        if serializer.is_valid():
            if IsOwn.has_object_permission(request, tag):
                item = serializer.update(tag, serializer.validated_data)
                return Response(TagSerializer(item).data)
            return Response(Error.RESPONSE_101_NO_PERMISSION, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        tag = self.get_object(pk)
        serializer = TagSerializer(tag)
        if tag:
            if IsOwn.has_object_permission(request, tag):
                tag.delete()
                return Response(serializer.data)
            return Response(Error.RESPONSE_101_NO_PERMISSION, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_204_NO_CONTENT)
