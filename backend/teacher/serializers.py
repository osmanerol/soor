from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer
from django.contrib.auth.password_validation import validate_password
from core.models import User
from .models import Teacher

class TeacherSerializer(ModelSerializer):
    class Meta:
        model = Teacher
        exclude = ['teacher']
        depth = 1

class UserSerializer(ModelSerializer):
    teacher = TeacherSerializer()
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'teacher']

class TeacherRegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

    def validate(self, attrs):
        validate_password(attrs['password'])
        return attrs    
    
    def create(self, validated_data):
        user = User.objects.create(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            email = validated_data['email'],
            username = validated_data['email'],
            is_teacher = True
        )
        user.set_password(validated_data['password'])
        user.save()
        teacher = Teacher.objects.create(teacher = user)
        teacher.save()
        return user

class TeacherUpdateSerializer(ModelSerializer):
    teacher = TeacherSerializer()
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'teacher']

    def update(self, instance, validated_data):
        teacher = validated_data.pop('teacher')
        teacher_serializer = TeacherSerializer(instance.teacher, data = teacher)
        teacher_serializer.is_valid(raise_exception = True)
        teacher_serializer.save()
        validated_data['username'] = validated_data['email']
        return super(TeacherUpdateSerializer, self).update(instance, validated_data)

class TeacherChangePasswordSerializer(Serializer):
    old_password = serializers.CharField(required = True)
    new_password = serializers.CharField(required = True)

    def validate_new_password(self, value):
        validate_password(value)
        return value