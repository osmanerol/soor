from .serializers import UserSerializer, UserUpdateSerializer
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, RetrieveAPIView, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Value
from django.db.models.functions import Concat
from .paginations import InstructorPagination
from .models import Instructor
from student.models import Student
from user.models import User

class InstructorListAPIView(ListAPIView):
    serializer_class = UserSerializer
    pagination_class = InstructorPagination
    authentication_classes = []

    def get_queryset(self):
        queryset = User.objects.filter(is_instructor = True).order_by('id')
        queryset = queryset.annotate(search_name = Concat('first_name', Value(' '), 'last_name'))
        name = self.request.GET.get('name')
        lecture_id = self.request.GET.get('lecture_id')
        status = self.request.GET.get('status')
        if(lecture_id):
            queryset = queryset.filter(instructor__lectures__id = lecture_id)
        if(name):
            queryset = queryset.filter(search_name__icontains = name)
        if(status):
            queryset = queryset.filter(instructor__status = status)
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
    authentication_classes = []

class InstructorProfileAPIView(RetrieveAPIView):
    queryset = User.objects.filter(is_instructor = True)
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        object = get_object_or_404(queryset, id = self.request.user.id)
        return object
    
class InstructorLastAPIView(ListAPIView):
    queryset = User.objects.filter(is_instructor = True).order_by('id')[:12]
    serializer_class = UserSerializer
    authentication_classes = []

class InstructorIncreaseBalanceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        instructor = Instructor.objects.get(user__id = request.data['instructorId'])
        instructor.balance += instructor.lessonPrice
        instructor.save()
        return Response({ 'detail' : 'balance increased' })

class InstructorDecreaseBalanceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        instructor = Instructor.objects.get(user__id = request.data['instructorId'])
        instructor.balance -= instructor.lessonPrice
        instructor.save()
        return Response({ 'detail' : 'balance decreased' })

class InstructorUpdateStatusAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        instructor = Instructor.objects.get(user__id = self.request.user.id)
        if instructor.status == 2:
            instructor.totalLesson += 1
        instructor.status = request.data['status']
        instructor.save()
        return Response({ 'detail' : 'status updated' })
        
class InstructorUpdateBalanceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        instructor = Instructor.objects.get(user__id = self.request.user.id)
        instructor.balance -= request.data['amount']
        instructor.save()
        return Response({ 'detail' : 'balance updated' })