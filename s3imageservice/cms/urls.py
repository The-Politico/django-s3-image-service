from django.urls import include, path
from rest_framework import routers
from django.contrib import admin
from .viewsets.upload import UploadViewset
from .views import Detail, List, Upload

router = routers.DefaultRouter()
router.register(r"upload", UploadViewset, base_name="upload")

app_name = "cms"

urlpatterns = [
    path("", List.as_view(), name="list"),
    path("upload/", Upload.as_view(), name="upload"),
    path("detail/<upload>/", Detail.as_view(), name="detail"),
    path("api/", include(router.urls)),
]
