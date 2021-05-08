from rest_framework import serializers
from rest_framework.serializers import ModelSerializer 
from .models import User
from rest_auth.serializers import JWTSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.conf import settings
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
    image = serializers.SerializerMethodField()
    slug = serializers.SerializerMethodField()
    userType = serializers.SerializerMethodField()

    def get_image(self, instance):
        if(instance.is_student):
            user = Student.objects.get(user = instance)
        elif(instance.is_instructor):
            user = Instructor.objects.get(user = instance)
            print(user.image)
        image_url = '{}/media/{}'.format(settings.SITE_URL,user.image)
        return image_url
    
    def get_slug(self, instance):
        if(instance.is_student):
            user = Student.objects.get(user = instance)
        elif(instance.is_instructor):
            user = Instructor.objects.get(user = instance)
        return user.slug
    
    def get_userType(self, instance):
        if(instance.is_student):
            return 1
        elif(instance.is_instructor):
            return 2

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'userType',  'image', 'slug']

class CustomTokenObtainSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        # when instructor login , status update to 1
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['user_type'] = 1 if self.user.is_student else 2
        if(self.user.is_instructor):
            instructor = Instructor.objects.get(user__id = self.user.id)
            instructor.status = 1
            instructor.save()
        return data