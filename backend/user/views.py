from .models import User
from .serializers import UserSerializer, UserDetailSerializer, CustomTokenObtainSerializer
from rest_framework.generics import CreateAPIView, DestroyAPIView, RetrieveAPIView, get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .permissions import NotAuthenticated

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