from django.urls import path
from .views import CommentListAPIView

urlpatterns = [
    path('list/<instructor__slug>', CommentListAPIView.as_view(), name = 'list')
]
