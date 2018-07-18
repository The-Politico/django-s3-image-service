from django.urls import path

from .views import Upload

urlpatterns = [
    path('', Upload.as_view(), name='s3imageservice-upload'),
]
