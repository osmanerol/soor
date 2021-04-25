from django.urls import path
from .views import StudentUpdateAPIView

urlpatterns = [
    path('update', StudentUpdateAPIView.as_view(), name = 'update')
]
