from django.urls import path
from .views import StudentUpdateAPIView, StudentProfileAPIView, StudentUpdateCreditAPIView

urlpatterns = [
    path('update', StudentUpdateAPIView.as_view(), name = 'update'),
    path('me', StudentProfileAPIView.as_view(), name = 'me'),
    path('update-credit', StudentUpdateCreditAPIView.as_view(), name = 'update-credit')
]