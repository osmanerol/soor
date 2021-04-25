from django.contrib import admin
from django.urls import path, include
from user.views import CustomTokenObtainPairView
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls')),
    path('api/user/', include('user.urls')),
    path('api/instructor/', include('instructor.urls')),
    path('api/student/', include('student.urls')),
    path('api/category/', include('category.urls')),
    path('api/lecture/', include('lecture.urls')),
    path('api/token', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)