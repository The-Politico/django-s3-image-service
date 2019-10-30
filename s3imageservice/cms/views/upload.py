from s3imageservice.cms.views.base import CMSBaseView
from django.views.generic.base import RedirectView
from django.urls import reverse


class Upload(CMSBaseView):
    template_name = "upload.html"

    def test_model_instance_exists(self, request, *args, **kwargs):
        pass

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context
