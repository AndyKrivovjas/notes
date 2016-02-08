from app.api.errors import Error
from app.users.models import User
from .models import Task, Color
from .serializers import TaskSerializer, ColorSerializer, TaskCreateUpdateSerializer
from app.api.permissions import IsOwn
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from oauth2_provider.ext.rest_framework import TokenHasReadWriteScope, TokenHasScope, OAuth2Authentication

class ColorList(APIView):

    authentication_classes = []
    permission_classes = [permissions.AllowAny, ]
    required_scopes = []

    def get(self, request, format=None):
        colors = Color.objects.all()
        serializer = ColorSerializer(colors, many=True)
        return Response(serializer.data)

class TaskList(APIView):

    authentication_classes = [OAuth2Authentication]
    permission_classes = [permissions.IsAuthenticated, TokenHasScope, ]
    required_scopes = ['task']

    def get(self, request, format=None):
        tasks = Task.objects.filter(owner=request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TaskCreateUpdateSerializer(data=request.data)
        owner = User.objects.get(pk=request.user.id)

        if serializer.is_valid():
            item = serializer.add(owner, request.data)
            return Response(TaskSerializer(item).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetail(APIView):

    authentication_classes = [OAuth2Authentication]
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope, ]
    required_scopes = ['task']

    def get_object(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        task = self.get_object(pk)

        if IsOwn.has_object_permission(request, task):
            category = TaskSerializer(task)
            return Response(category.data)
        return Response(Error.RESPONSE_101_NO_PERMISSION, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        task = self.get_object(pk)
        serializer = TaskCreateUpdateSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            if IsOwn.has_object_permission(request, task):
                item = serializer.update(task, request.data)
                return Response(TaskSerializer(item).data)
            return Response(Error.RESPONSE_101_NO_PERMISSION, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        task = self.get_object(pk)
        data = TaskSerializer(task).data
        if task:
            if IsOwn.has_object_permission(request, task):
                task.delete()
                return Response(data)
            return Response(Error.RESPONSE_101_NO_PERMISSION, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_204_NO_CONTENT)
