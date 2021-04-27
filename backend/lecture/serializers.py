from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Lecture

class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = '__all__'