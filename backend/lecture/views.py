from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, RetrieveUpdateAPIView, DestroyAPIView
from .models import Lecture
from .serializers import LectureSerializer
from .permissions import IsSuperUser

class LectureListAPIView(ListAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    
class LectureCreateAPIView(CreateAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    permission_class = [IsSuperUser]

class LectureDetailAPIView(RetrieveAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    lookup_field = 'pk'
    
class LectureUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    permission_class = [IsSuperUser]
    lookup_field = 'pk'

class LectureDeleteAPIView(DestroyAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    permission_class = [IsSuperUser]
    lookup_field = 'pk'