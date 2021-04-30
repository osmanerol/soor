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
        student_data = Student.objects.get(id = instance.student.id)
        if 'image' in student:
            student_data.image = student['image']
        student_data.credit = student['credit']
        student_data.save()      
        instance.student = student_data
        return super(UserUpdateSerializer, self).update(instance, validated_data)