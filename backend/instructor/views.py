from .serializers import UserSerializer, UserUpdateSerializer
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, RetrieveAPIView, get_object_or_404
from .models import Instructor
from user.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter
from .paginations import InstructorPagination

class InstructorListAPIView(ListAPIView):
    queryset = User.objects.filter(is_instructor = True)
    serializer_class = UserSerializer
    filter_backends = [SearchFilter]
    search_fields = ['first_name', 'last_name']
    pagination_class = InstructorPagination

class InstructorUpdateAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.filter(is_instructor = True)
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        print(self.request.user.id)
        object = get_object_or_404(queryset, id = self.request.user.id)
        return object

class InstructorDetailAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'instructor__slug'
