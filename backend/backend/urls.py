from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from rest_framework_simplejwt import views as jwt_views
from django.conf import settings
from rest_framework_swagger.views import get_swagger_view
schema_view = get_swagger_view(title="Notes API")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/docs/', schema_view),
    path('api/category/', include('category.urls')),
    path('api/lecture/', include('lecture.urls')),
    path('api/teacher/', include('teacher.urls')),
    path('api/token', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)