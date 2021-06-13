from django.urls import path
from .views import InstructorListAPIView, InstructorUpdateAPIView, InstructorDetailAPIView, InstructorLastAPIView, InstructorProfileAPIView, InstructorIncreaseBalanceAPIView, InstructorDecreaseBalanceAPIView, InstructorUpdateStatusAPIView, InstructorUpdateBalanceAPIView

urlpatterns = [
    path('list', InstructorListAPIView.as_view(), name = 'list'),
    path('update', InstructorUpdateAPIView.as_view(), name ='update'),
    path('profile/<instructor__slug>', InstructorDetailAPIView.as_view(), name = 'profile'),
    path('me', InstructorProfileAPIView.as_view(), name = 'me'),
    path('last', InstructorLastAPIView.as_view(), name = 'instructor-last'),
    path('increase-balance', InstructorIncreaseBalanceAPIView.as_view(), name = 'increase-balance'),
    path('decrease-balance', InstructorDecreaseBalanceAPIView.as_view(), name = 'decrease-balance'),
    path('update-balance', InstructorUpdateBalanceAPIView.as_view(), name = 'update-balance'),
    path('update-status', InstructorUpdateStatusAPIView.as_view(), name = 'update-status'),
]