from django.urls import path, include

from .views import ImageService

app_name = "s3imageservice"

urlpatterns = [
    path("", ImageService.as_view(), name="upload"),
    path(
        "cms/",
        include("s3imageservice.cms.urls", namespace="s3imageservice_cms"),
    ),
]
