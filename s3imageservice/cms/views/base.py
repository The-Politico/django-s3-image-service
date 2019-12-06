import os
from django.http import Http404
from django.views.generic import TemplateView
from django.conf import settings
from s3imageservice.conf import settings as app_settings
from s3imageservice.utils.auth import secure


@secure
class CMSBaseView(TemplateView):
    model = None

    def setup(self, request, *args, **kwargs):
        if self.model:
            try:
                self.test_model_instance_exists(request, *args, **kwargs)
            except:
                raise Http404("No {} found.".format(self.model.__name__))

        return super().setup(request, *args, **kwargs)

    def test_model_instance_exists():
        pass

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context["S3_ROOT"] = os.path.join(
            app_settings.AWS_S3_STATIC_ROOT, app_settings.S3_UPLOAD_ROOT
        )
        context["FILE_MB_LIMIT"] = app_settings.FILE_MB_LIMIT
        context["CMS_PAGE_SIZE"] = app_settings.CMS_PAGE_SIZE
        context["CMS_DEFAULT_SIZES"] = app_settings.CMS_DEFAULT_SIZES

        if self.request.user.is_authenticated:
            context["user"] = self.request.user
            context["user_id"] = self.request.user.pk
        else:
            context["user"] = None
            context["user_id"] = None

        return context
