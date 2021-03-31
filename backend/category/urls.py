from django.urls import path
from .views import CategoryListAPIView, CategoryCreateAPIView, CategoryDetailAPIView, CategoryUpdateAPIView, CategoryDeleteAPIView

urlpatterns = [
    path('list', CategoryListAPIView.as_view(), name = 'list'),
    path('create', CategoryCreateAPIView.as_view(), name = 'create'),
    path('detail/<pk>', CategoryDetailAPIView.as_view(), name = 'detail'),
    path('update/<pk>', CategoryUpdateAPIView.as_view(), name = 'update'),
    path('delete/<pk>', CategoryDeleteAPIView.as_view(), name = 'delete'),

]