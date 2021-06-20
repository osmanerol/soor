from django.db.models import query
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView, RetrieveAPIView, UpdateAPIView, get_object_or_404
from rest_framework.views import APIView
from .models import Lesson
from user.models import User
from lecture.models import Lecture
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from .serializers import LessonSerializer, LessonListSerializer
from .paginations import LessonPagination
from rest_framework.response import Response

class LessonCreateAPIView(CreateAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_class = [IsAuthenticated]

    def perform_create(self, serializer):
        instructor = get_object_or_404(User, id = self.request.data.get('instructor'))
        student = get_object_or_404(User, id = self.request.data.get('student'))
        message = student.first_name + ' ' + student.last_name + ' isimli öğrenci yeni bir ders talebi oluşturdu.  https://soor.vercel.app/call/' + self.request.data.get('link') + ' alanından derse gidebilirsiniz.'
        send_mail(
            'Yeni ders',
            message,
            'soorappdev@gmail.com',
            [instructor.email],
            fail_silently=False,
        )
        student = get_object_or_404(User, id = self.request.user.id)
        lecture = get_object_or_404(Lecture, id = self.request.data.get('lecture'))
        return serializer.save(instructor = instructor, student = student, lecture = lecture)

class LessonInstructorListAPIView(ListAPIView):
    serializer_class = LessonListSerializer
    pagination_class = LessonPagination
    permission_class = [IsAuthenticated]

    def get_queryset(self):
        return Lesson.objects.filter(instructor__id = self.request.user.id)

class LessonStudentListAPIView(ListAPIView):
    serializer_class = LessonListSerializer
    pagination_class = LessonPagination
    permission_class = [IsAuthenticated]
    
    def get_queryset(self):
        return Lesson.objects.filter(student__id = self.request.user.id)

class LessonDeleteAPIView(DestroyAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_class = [IsAuthenticated]
    lookup_field = 'pk'

class LessonStatusUpdateAPIView(APIView):
    lookup_field = 'pk'

    def put(self, request, pk):
        lesson = Lesson.objects.get(id = pk)
        if request.data['userType'] == 1:
            lesson.studentStatus = request.data['status'] 
        elif request.data['userType'] == 2:
            lesson.instructorStatus = request.data['status']           
        lesson.save()
        return Response({ 'detail' : 'status updated' })

class LessonDetailAPIView(RetrieveAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_class = [IsAuthenticated]
    lookup_field = 'link'