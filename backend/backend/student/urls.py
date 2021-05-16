from django.urls import path
from .views import StudentUpdateAPIView, StudentProfileAPIView, StudentIncreaseCreditAPIView, StudentDecreaseCreditAPIView

urlpatterns = [
    path('update', StudentUpdateAPIView.as_view(), name = 'update'),
    path('me', StudentProfileAPIView.as_view(), name = 'me'),
    path('increase-credit', StudentIncreaseCreditAPIView.as_view(), name = 'increase-credit'),
    path('decrease-credit', StudentDecreaseCreditAPIView.as_view(), name = 'decrease-credit')
]