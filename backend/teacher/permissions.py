from rest_framework.permissions import BasePermission

class NotAuthenticated(BasePermission):
    message = 'Zaten hesabınız var.'

    def has_permission(self, request, view):
        return not request.user.is_authenticated

class IsOwner(BasePermission):
    message = 'İşlemin sahibi olmalısınız.'

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user and request.user.is_authenticated