from django.urls import path

from .views import ImageService

urlpatterns = [
    path('', ImageService.as_view(), name='s3imageservice-upload'),
]
