from rest_framework.generics import RetrieveAPIView, RetrieveUpdateAPIView, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserUpdateSerializer
from rest_framework.permissions import IsAuthenticated
from user.models import User
from student.models import Student

class StudentProfileAPIView(RetrieveAPIView):
    queryset = User.objects.filter(is_student = True)
    serializer_class = UserUpdateSerializer 
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        object = get_object_or_404(queryset, id = self.request.user.id)
        return object

class StudentUpdateAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.filter(is_student = True)
    serializer_class = UserUpdateSerializer 
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        object = get_object_or_404(queryset, id = self.request.user.id)
        return object

class StudentIncreaseCreditAPIView(APIView):
    
    def put(self, request):
        student = Student.objects.get(user__id = self.request.user.id)
        student.credit += request.data['lessonPrice']
        student.save()
        return Response({ 'detail' : 'credit increased'})

class StudentDecreaseCreditAPIView(APIView):
    
    def put(self, request):
        student = Student.objects.get(user__id = self.request.user.id)
        student.credit -= request.data['lessonPrice']
        student.save()
        return Response({ 'detail' : 'credit decreased'})

class StudentUpdateCreditAPIView(APIView):
    
    def put(self, request):
        student = Student.objects.get(user__id = self.request.user.id)
        student.credit += request.data['amount']
        student.save()
        return Response({ 'detail' : 'credit updated'})