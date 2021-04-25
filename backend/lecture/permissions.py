from rest_framework.permissions import BasePermission

class IsSuperUser(BasePermission):
    messega = 'Only admin can do this operation.'

    def has_permission(self, request, view):
        return request.user.is_superuser