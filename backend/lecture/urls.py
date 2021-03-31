from django.urls import path
from .views import LectureListAPIView, LectureCreateAPIView, LectureDetailAPIView, LectureUpdateAPIView, LectureDeleteAPIView

urlpatterns = [
    path('list', LectureListAPIView.as_view(), name = 'list'),
    path('create', LectureCreateAPIView.as_view(), name = 'create'),
    path('detail/<pk>', LectureDetailAPIView.as_view(), name = 'detail'),
    path('update/<pk>', LectureUpdateAPIView.as_view(), name = 'update'),
    path('delete/<pk>', LectureDeleteAPIView.as_view(), name = 'delete'),

]