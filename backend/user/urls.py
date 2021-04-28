from django.urls import path
from .views import UserRegisterAPIView, UserDeleteAPIView, UserDetailAPIView, TotalDataListAPIView

urlpatterns = [
    path('register', UserRegisterAPIView.as_view(), name = 'register'),
    path('delete', UserDeleteAPIView.as_view(), name = 'delete'),
    path('me', UserDetailAPIView.as_view(), name = 'me'),
    path('total-data', TotalDataListAPIView.as_view(), name = 'total-data'),
]
