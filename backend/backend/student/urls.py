from django.urls import path
from .views import StudentUpdateAPIView, StudentProfileAPIView

urlpatterns = [
    path('update', StudentUpdateAPIView.as_view(), name = 'update'),
    path('me', StudentProfileAPIView.as_view(), name = 'me')
]