from django.urls import path

from .views import Home

urlpatterns = [
    path('', Home.as_view(), name='s3imageservice-home'),
]
