from django.urls import path
from .views import TeacherRegisterAPIView, TeacherListAPIView, TeacherUpdateAPIView, TeacherDetailAPIView, TeacherDeleteAPIView, TeacherChangePasswordAPIView

urlpatterns = [
    path('register', TeacherRegisterAPIView.as_view(), name='register'),
    path('list', TeacherListAPIView.as_view(), name='list'),
    path('detail/<teacher__slug>', TeacherDetailAPIView.as_view(), name='detail'),
    path('update', TeacherUpdateAPIView.as_view(), name='update'),
    path('delete', TeacherDeleteAPIView.as_view(), name='delete'),
    path('change-password', TeacherChangePasswordAPIView().as_view(), name='change-password'),
]