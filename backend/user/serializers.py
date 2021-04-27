from rest_framework.serializers import ModelSerializer 
from .models import User
from rest_auth.serializers import JWTSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from instructor.models import Instructor
from student.models import Student

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'is_instructor', 'is_student']

    def create(self, validated_data):
        user = User.objects.create(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            email = validated_data['email'],
            is_instructor = validated_data['is_instructor'],
            is_student = validated_data['is_student'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']

class CustomTokenObtainSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['user_type'] = 1 if self.user.is_student else 2
        return data