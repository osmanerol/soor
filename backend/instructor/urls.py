from django.urls import path
from .views import InstructorListAPIView, InstructorUpdateAPIView, InstructorDetailAPIView, InstructorSoonAPIView, TotalDataListAPIView

urlpatterns = [
    path('list', InstructorListAPIView.as_view(), name = 'list'),
    path('update', InstructorUpdateAPIView.as_view(), name ='update'),
    path('profile/<instructor__slug>', InstructorDetailAPIView.as_view(), name = 'profile'),
    path('soon', InstructorSoonAPIView.as_view(), name = 'instructor-soon'),
    path('total-data', TotalDataListAPIView.as_view(), name = 'total-data'),
]
