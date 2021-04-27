from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView, DestroyAPIView
from rest_framework.views import APIView 
from .serializers import LectureSerializer
from .models import Lecture
from .permissions import IsSuperUser
from rest_framework.response import Response

class LectureCreateAPIView(CreateAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    permission_classes = [IsSuperUser]
    
class LectureListAPIView(ListAPIView):
    
    def get(self, request):
        count = Lecture.objects.count();
        results = Lecture.objects.all()
        results_serializer = LectureSerializer(results, many = True)
        return Response({'count' : count, 'results' : results_serializer.data})
    
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