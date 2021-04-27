from django.urls import path
from .views import InstructorListAPIView, InstructorUpdateAPIView, InstructorDetailAPIView

urlpatterns = [
    path('list', InstructorListAPIView.as_view(), name = 'list'),
    path('update', InstructorUpdateAPIView.as_view(), name ='update'),
    path('profile/<instructor__slug>', InstructorDetailAPIView.as_view(), name = 'profile'),
]
