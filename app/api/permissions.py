from rest_framework import permissions, status


class IsOwn(permissions.BasePermission):

    SAFE_METHODS = []

    @staticmethod
    def has_object_permission(request, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in IsOwn.SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        return obj.owner == request.user
