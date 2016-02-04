from rest_framework import permissions, status
from rest_framework.response import Response
from app.api.errors import Error

class UserPermissions(permissions.BasePermission):

    SAFE_METHODS = []

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        return obj.owner == request.user

    @staticmethod
    def is_owner(request, user):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in UserPermissions.SAFE_METHODS:
            return True

        return user.data.get('username') == str(request.user)
