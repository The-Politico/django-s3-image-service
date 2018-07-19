"""
Use this file to configure pluggable app settings and resolve defaults
with any overrides set in project settings.
"""

from django.conf import settings as project_settings
from s3imageservice.utils.importers import import_class


class Settings:
    pass


Settings.AUTH_DECORATOR = getattr(
    project_settings,
    'S3IMAGESERVICE_AUTH_DECORATOR',
    'django.contrib.auth.decorators.login_required'
)

Settings.SECRET_KEY = getattr(
    project_settings, 'S3IMAGESERVICE_SECRET_KEY', 'a-bad-secret-key')

Settings.AWS_ACCESS_KEY_ID = getattr(
    project_settings, 'S3IMAGESERVICE_AWS_ACCESS_KEY_ID', None)

Settings.AWS_SECRET_ACCESS_KEY = getattr(
    project_settings, 'S3IMAGESERVICE_AWS_SECRET_ACCESS_KEY', None)

Settings.AWS_REGION = getattr(
    project_settings, 'S3IMAGESERVICE_AWS_REGION', None)

Settings.AWS_S3_BUCKET = getattr(
    project_settings, 'S3IMAGESERVICE_AWS_S3_BUCKET', None)

Settings.CLOUDFRONT_ALTERNATE_DOMAIN = getattr(
    project_settings,
    'S3IMAGESERVICE_CLOUDFRONT_ALTERNATE_DOMAIN',
    None
)

Settings.S3_UPLOAD_ROOT = getattr(
    project_settings, 'S3IMAGESERVICE_S3_UPLOAD_ROOT', 'uploads/s3imageservice')

Settings.AWS_S3_STATIC_ROOT = getattr(
    project_settings, 'S3IMAGESERVICE_AWS_S3_STATIC_ROOT', None)

Settings.API_AUTHENTICATION_CLASS = import_class(
    getattr(
        project_settings,
        'S3IMAGESERVICE_API_AUTHENTICATION_CLASS',
        'rest_framework.authentication.BasicAuthentication'
    )
)

Settings.API_PERMISSION_CLASS = import_class(
    getattr(
        project_settings,
        'S3IMAGESERVICE_API_PERMISSION_CLASS',
        'rest_framework.permissions.IsAuthenticated'
    )
)

Settings.MEDIA_ROOT = getattr(
    project_settings, 'MEDIA_ROOT', '')

Settings.MEDIA_PATH = getattr(
    project_settings, 'S3IMAGESERVICE_MEDIA_PATH', '')

Settings.FILE_MB_LIMIT = getattr(
    project_settings, 'S3IMAGESERVICE_FILE_MB_LIMIT', 100)



settings = Settings
