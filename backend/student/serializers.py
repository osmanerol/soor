from rest_framework.serializers import ModelSerializer
from .models import User
from .models import Student

class StudentUpdateSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class UserUpdateSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'student']