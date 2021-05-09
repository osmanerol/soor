from rest_framework.serializers import ModelSerializer
from lecture.models import Lecture

class LectureSerializer(ModelSerializer):
    class Meta:
        model = Lecture
        fields = '__all__'