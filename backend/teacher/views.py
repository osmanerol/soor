from rest_framework.generics import get_object_or_404, CreateAPIView, ListAPIView, RetrieveUpdateAPIView, RetrieveAPIView, DestroyAPIView
from rest_framework.views import APIView
from core.models import User
from .models import Teacher
from .permissions import NotAuthenticated
from .serializers import TeacherRegisterSerializer , TeacherSerializer, UserSerializer, TeacherUpdateSerializer, TeacherChangePasswordSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import update_session_auth_hash
from rest_framework import status

class TeacherRegisterAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = TeacherRegisterSerializer
    permission_classes = [NotAuthenticated]

class TeacherListAPIView(ListAPIView):
    serializer_class = UserSerializer
    
    def get_queryset(self):
        queryset = User.objects.filter(is_teacher = True)
        return queryset

class TeacherDetailAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'teacher__slug'

class TeacherUpdateAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = TeacherUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, id = self.request.user.id)        
        return obj

class TeacherDeleteAPIView(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, id = self.request.user.id)
        return obj

class TeacherChangePasswordAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        self.object = self.request.user
        data = {
            'old_password' : request.data['old_password'],
            'new_password' : request.data['new_password']
        }
        serializer = TeacherChangePasswordSerializer(data = data)
        if serializer.is_valid():
            old_password = serializer.data['old_password']
            # girilen eski sifre suanki sifre mi
            if not self.object.check_password(old_password):
                return Response({'old_password' : 'Yanlış şifre girdiniz.'})
            self.object.set_password(serializer.data.get('new_password'))
            self.object.save()
            # sifre degistikten sonra oturum kapanmaması icin
            update_session_auth_hash(request, self.object)
            return Response(status = status.HTTP_204_NO_CONTENT)
        return Response(serializer.data, status.HTTP_400_BAD_REQUEST)