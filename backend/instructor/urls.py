from django.urls import path
from .views import InstructorListAPIView, InstructorUpdateAPIView, InstructorDetailAPIView, InstructorLastAPIView, InstructorProfileAPIView

urlpatterns = [
    path('list', InstructorListAPIView.as_view(), name = 'list'),
    path('update', InstructorUpdateAPIView.as_view(), name ='update'),
    path('profile/<instructor__slug>', InstructorDetailAPIView.as_view(), name = 'profile'),
    path('me', InstructorProfileAPIView.as_view(), name = 'me'),
    path('last', InstructorLastAPIView.as_view(), name = 'instructor-last'),
]
