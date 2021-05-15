from .models import User
from .serializers import UserSerializer, UserDetailSerializer, CustomTokenObtainSerializer
from rest_framework.generics import CreateAPIView, DestroyAPIView, RetrieveAPIView, get_object_or_404
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .permissions import NotAuthenticated
from instructor.models import Instructor
from student.models import Student
from lesson.models import Lesson

class UserRegisterAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [NotAuthenticated]

class UserDeleteAPIView(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        queryset = self.get_queryset()
        object = get_object_or_404(queryset, id = self.request.user.id)
        return object
    
class UserDetailAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        object = get_object_or_404(queryset, id = self.request.user.id)
        return object

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainSerializer

class TotalDataListAPIView(APIView):
    authentication_classes = []
    
    def get(self, request):
        data = {
            'total_instructor' : Instructor.objects.count(),
            'total_student' : Student.objects.count(),
            'total_lesson' : Lesson.objects.count()
        }
        return Response(data)

class UserLogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = self
        if(self.request.user.is_instructor):
            instructor = Instructor.objects.get(user__id = self.request.user.id)
            instructor.status = 0
            instructor.save()
        return Response({'response' : 'logged out'})