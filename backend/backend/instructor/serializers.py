from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from user.models import User
from .models import Instructor
from lecture.models import Lecture

class InstructorSerializer(ModelSerializer):
    class Meta:
        model = Instructor
        exclude = ['user', 'balance']
        depth = 1

class UserSerializer(ModelSerializer):
    instructor = InstructorSerializer()

    class Meta:
        model = User 
        fields = ['id', 'first_name', 'last_name', 'email', 'instructor']

class InstructorUpdateSerializer(ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['slug', 'image', 'university', 'department', 'job', 'lessonPrice', 'about', 'lectures', 'balance']

class UserUpdateSerializer(ModelSerializer):
    instructor = InstructorUpdateSerializer()

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'instructor']

    def update(self, instance, validated_data):
        instructor = validated_data.pop('instructor')
        instructor_profile = Instructor.objects.get(id = instance.instructor.id)
        """
        if 'image' in instructor:
            instructor_profile.image = instructor['image']
        """
        instructor_profile.image = instructor['image']
        instructor_profile.university = instructor['university']
        instructor_profile.department = instructor['department']
        instructor_profile.job = instructor['job']
        instructor_profile.lessonPrice = instructor['lessonPrice']
        instructor_profile.about = instructor['about']
        instructor_profile.lectures.clear()
        for lecture in instructor['lectures']:
            instructor_profile.lectures.add(lecture)
        instructor_profile.save()
        instance.instructor = instructor_profile
        return super(UserUpdateSerializer, self).update(instance, validated_data)
