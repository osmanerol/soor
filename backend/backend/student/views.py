from rest_framework.generics import RetrieveAPIView, RetrieveUpdateAPIView, get_object_or_404
from user.models import User
from .serializers import UserUpdateSerializer
from rest_framework.permissions import IsAuthenticated

class StudentProfileAPIView(RetrieveAPIView):
    queryset = User.objects.filter(is_student = True)
    serializer_class = UserUpdateSerializer 
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        object = get_object_or_404(queryset, id = self.request.user.id)
        return object

class StudentUpdateAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.filter(is_student = True)
    serializer_class = UserUpdateSerializer 
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        object = get_object_or_404(queryset, id = self.request.user.id)
        return object