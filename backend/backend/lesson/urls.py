from django.urls import path
from .views import LessonCreateAPIView, LessonInstructorListAPIView, LessonStudentListAPIView, LessonDeleteAPIView, LessonStatusUpdateAPIView

urlpatterns = [
    path('create', LessonCreateAPIView.as_view(), name = 'create'),
    path('delete/<pk>', LessonDeleteAPIView.as_view(), name = 'delete'),
    path('instructor/list', LessonInstructorListAPIView.as_view(), name = 'list'),
    path('student/list', LessonStudentListAPIView.as_view(), name = 'list'),
    path('update-status/<pk>', LessonStatusUpdateAPIView.as_view(), name = 'update'),
]
