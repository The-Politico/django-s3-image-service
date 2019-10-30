import uuid
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from django.db import models


class Upload(models.Model):
    """
    An image upload.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.PROTECT
    )
    canonical = models.URLField(unique=True)
    data = JSONField(blank=True, null=True)
    slug = models.CharField(unique=True, max_length=50)

    def __str__(self):
        return self.canonical

    class Meta:
        ordering = ["-timestamp"]
