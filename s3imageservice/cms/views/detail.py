from s3imageservice.cms.views.base import CMSBaseView
from django.views.generic.base import RedirectView
from django.urls import reverse
from s3imageservice.models import Upload


class Detail(CMSBaseView):
    template_name = "detail.html"
    model = Upload

    def test_model_instance_exists(self, request, *args, **kwargs):
        Upload.objects.get(id=kwargs["upload"])

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context
