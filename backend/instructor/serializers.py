from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from user.models import User
from .models import Instructor
from student.models import Student
from lecture.models import Lecture

class InstructorSerializer(ModelSerializer):
    class Meta:
        model = Instructor
        exclude = ['user']
        depth = 1

class UserSerializer(ModelSerializer):
    instructor = InstructorSerializer()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'instructor']
    
class InstructorUpdateSerializer(ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['image', 'university', 'department', 'job', 'lessonPrice', 'about', 'lectures']
        
class UserUpdateSerializer(ModelSerializer):
    instructor = InstructorUpdateSerializer()

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'instructor']

    def update(self, instance, validated_data):
        instructor = validated_data.pop('instructor')
        instructor_data = Instructor.objects.get(id = instance.instructor.id)
        instructor_data.university = instructor['university']
        instructor_data.department = instructor['department']
        instructor_data.job = instructor['job']
        instructor_data.lessonPrice = instructor['lessonPrice']
        instructor_data.about = instructor['about']
        instructor_data.lectures.clear()
        for lecture in instructor['lectures']:
            instructor_data.lectures.add(lecture)
        instructor_data.save()      
        instance.instructor = instructor_data
        return super(UserUpdateSerializer, self).update(instance, validated_data)