from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView, DestroyAPIView
from .serializers import LectureSerializer
from .models import Lecture
from .permissions import IsSuperUser

class LectureCreateAPIView(CreateAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    permission_classes = [IsSuperUser]
    
class LectureListAPIView(ListAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    
class LectureDetailAPIView(RetrieveAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    lookup_field = 'pk'

class LectureUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    lookup_field = 'pk'
    permission_classes = [IsSuperUser]

class LectureDeleteAPIView(DestroyAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    lookup_field = 'pk'
    permission_classes = [IsSuperUser]