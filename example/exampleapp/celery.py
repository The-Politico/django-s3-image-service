import os

from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'exampleapp.settings')

app = Celery('s3imageservice', broker="redis://localhost")
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.update(
    task_serializer='json',
    timezone='America/New_York',
)
# Use synchronous in local dev
if settings.DEBUG:
    app.conf.update(task_always_eager=True)
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS, related_name='celery')
