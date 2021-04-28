from .serializers import UserSerializer, UserUpdateSerializer
import django_filters.rest_framework
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, RetrieveAPIView, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Instructor
from student.models import Student
from user.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from .paginations import InstructorPagination
from django.db.models import Value
from django.db.models.functions import Concat

class InstructorListAPIView(ListAPIView):
    serializer_class = UserSerializer
    pagination_class = InstructorPagination

    def get_queryset(self):
        queryset = User.objects.filter(is_instructor = True).order_by('id')
        queryset = queryset.annotate(search_name = Concat('first_name', Value(' '), 'last_name'))
        name = self.request.GET.get('name')
        lecture_id = self.request.GET.get('lecture_id')
        if(lecture_id):
            queryset = queryset.filter(instructor__lectures__id = lecture_id)
        if(name):
            queryset = queryset.filter(search_name__icontains = name)
        return queryset

class InstructorUpdateAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.filter(is_instructor = True)
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        object = get_object_or_404(queryset, id = self.request.user.id)
        return object

class InstructorDetailAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'instructor__slug'

class InstructorProfileAPIView(RetrieveAPIView):
    queryset = User.objects.filter(is_instructor = True)
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        object = get_object_or_404(queryset, id = self.request.user.id)
        return object

class InstructorSoonAPIView(ListAPIView):
    queryset = User.objects.filter(is_instructor = True)[:12]
    serializer_class = UserSerializer
    pagination_class = InstructorPagination

class TotalDataListAPIView(APIView):

    def get(self, request):
        data = {
            'total_instructor' : Instructor.objects.count(),
            'total_student' : Student.objects.count(),
            'total_lesson' : 10
        }
        return Response(data)