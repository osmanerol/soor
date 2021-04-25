from .models import User
from .serializers import UserSerializer
from rest_framework.generics import CreateAPIView, DestroyAPIView, get_object_or_404
from .serializers import CustomTokenObtainSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
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
        print(self.request.user.id)
        object = get_object_or_404(queryset, id = self.request.user.id)
        return object

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainSerializer