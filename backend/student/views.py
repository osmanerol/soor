from rest_framework.generics import RetrieveUpdateAPIView, get_object_or_404
from user.models import User
from .serializers import StudentUpdateSerializer
from rest_framework.permissions import IsAuthenticated

class StudentUpdateAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = StudentUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        object = get_object_or_404(queryset, id = self.request.user.id)
        return object