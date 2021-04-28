from django.urls import path
from .views import InstructorListAPIView, InstructorUpdateAPIView, InstructorDetailAPIView, InstructorSoonAPIView, TotalDataListAPIView, InstructorProfileAPIView

urlpatterns = [
    path('list', InstructorListAPIView.as_view(), name = 'list'),
    path('update', InstructorUpdateAPIView.as_view(), name ='update'),
    path('profile/<instructor__slug>', InstructorDetailAPIView.as_view(), name = 'profile'),
    path('me', InstructorProfileAPIView.as_view(), name = 'me'),
    path('soon', InstructorSoonAPIView.as_view(), name = 'instructor-soon'),
]
