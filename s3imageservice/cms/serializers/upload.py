from s3imageservice.models import Upload
from rest_framework import serializers


class UploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upload
        fields = "__all__"
