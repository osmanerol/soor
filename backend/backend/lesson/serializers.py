from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Lesson
from user.models import User
from instructor.models import Instructor

class StudentSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']

class InstructorSerializer(ModelSerializer):
    lessonPrice = serializers.SerializerMethodField()
    slug = serializers.SerializerMethodField()
    
    def get_lessonPrice(self, instance):
        instructor = Instructor.objects.get(user = instance)
        return instructor.lessonPrice

    def get_slug(self, instance):
        instructor = Instructor.objects.get(user = instance)
        return instructor.slug

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'lessonPrice', 'slug']

class LessonListSerializer(ModelSerializer):
    student = StudentSerializer()
    instructor = InstructorSerializer()
    
    class Meta:
        model = Lesson
        fields = '__all__'
        depth = 1

class LessonSerializer(ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'
        depth = 1