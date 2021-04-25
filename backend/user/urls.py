from django.urls import path
from .views import UserRegisterAPIView, UserDeleteAPIView

urlpatterns = [
    path('register', UserRegisterAPIView.as_view(), name = 'register'),
    path('delete', UserDeleteAPIView.as_view(), name = 'delete'),
]
