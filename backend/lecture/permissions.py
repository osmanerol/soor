from rest_framework.permissions import BasePermission

class IsSuperUser(BasePermission):
    message = 'Sadece admin bu işlemi gerçekleştirebilir.'

    def has_permission(self, request, view):
        return request.user.is_superuser