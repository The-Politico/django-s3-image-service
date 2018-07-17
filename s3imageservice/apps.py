from django.apps import AppConfig


class S3imageserviceConfig(AppConfig):
    name = 's3imageservice'

    def ready(self):
        from s3imageservice import signals  # noqa
