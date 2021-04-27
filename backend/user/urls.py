from django.urls import path
from .views import UserRegisterAPIView, UserDeleteAPIView, UserDetailAPIView

urlpatterns = [
    path('register', UserRegisterAPIView.as_view(), name = 'register'),
    path('delete', UserDeleteAPIView.as_view(), name = 'delete'),
    path('me', UserDetailAPIView.as_view(), name = 'me'),
]
