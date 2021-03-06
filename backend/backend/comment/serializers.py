from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Comment
from user.models import User
from student.models import Student
from django.conf import settings

class StudentSerializer(ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, instance):
        request = self.context.get('request')
        student = Student.objects.get(user = instance)
        return student.image

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'image']

class CommentListSerializer(ModelSerializer):
    student = StudentSerializer()

    class Meta:
        model = Comment
        fields = '__all__'
        depth = 1

class CommentCreateSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

    