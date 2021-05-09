from rest_framework.serializers import ModelSerializer
from .models import User
from .models import Student

class StudentUpdateSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = ['image', 'slug', 'credit']

class UserUpdateSerializer(ModelSerializer):
    student = StudentUpdateSerializer()
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'student']
    
    def update(self, instance, validated_data):
        student = validated_data.pop('student')
        student_profile = Student.objects.get(id = instance.student.id)
        """
        if 'image' in student:
            student_profile.image = student['image']
        """
        student_profile.image = student['image']
        student_profile.credit = student['credit']
        student_profile.save()      
        instance.student = student_profile
        return super(UserUpdateSerializer, self).update(instance, validated_data)