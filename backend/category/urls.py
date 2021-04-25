from django.urls import path
from .views import CategoryCreateAPIView, CategoryListAPIView, CategoryDetailAPIView, CategoryUpdateAPIView, CategoryDeleteAPIView

urlpatterns = [
    path('create', CategoryCreateAPIView.as_view(), name = 'create'),
    path('list', CategoryListAPIView.as_view(), name = 'create'),
    path('detail/<pk>', CategoryDetailAPIView.as_view(), name = 'detail'),
    path('update/<pk>', CategoryUpdateAPIView.as_view(), name = 'update'),
    path('delete/<pk>', CategoryDeleteAPIView.as_view(), name = 'delete'),
]
