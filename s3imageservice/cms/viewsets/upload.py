from s3imageservice.models import Upload
from s3imageservice.cms.serializers.upload import UploadSerializer
from s3imageservice.conf import settings
from django.core.paginator import Paginator
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response


class DefaultPagination(PageNumberPagination):
    page_size = settings.CMS_PAGE_SIZE


class UploadViewset(viewsets.ModelViewSet):
    authentication_classes = ()
    permission_classes = ()
    pagination_class = DefaultPagination
    throttle_classes = []
    queryset = Upload.objects.all()
    serializer_class = UploadSerializer

    @action(detail=False, methods=["get"])
    def filter_for_user(self, request):
        user = request.GET.get("user", None)
        if not user:
            return Response(
                "No user provided.", status=status.HTTP_400_BAD_REQUEST
            )

        queryset = Upload.objects.filter(owner=user)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        else:
            return Response(
                "Something went wrong.",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
