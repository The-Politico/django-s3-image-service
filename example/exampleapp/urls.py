from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('s3imageservice.urls', namespace='s3imageservice')),
]
