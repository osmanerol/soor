from django.contrib import admin
from django.contrib.auth import views as auth_views
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
    path('api/comment/', include('comment.urls')),
    path('api/lesson/', include('lesson.urls')),
    path('api/token', CustomTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name = 'token_refresh'),
    path('auth/', include('djoser.urls')),
] + static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)

"""
path('reset_password', auth_views.PasswordResetView.as_view(), name = 'reset_password'),
path('reset_password_sent', auth_views.PasswordResetDoneView.as_view(), name = 'password_reset_done'),
path('reset/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(), name = 'password_reset_confirm'),
path('reset_password_complete', auth_views.PasswordResetCompleteView.as_view(), name = 'password_reset_complete'),
"""