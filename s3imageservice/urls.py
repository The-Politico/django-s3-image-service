from django.urls import path

from .views import ImageService

app_name = 's3imageservice'
urlpatterns = [
    path('', ImageService.as_view(), name='upload'),
]
