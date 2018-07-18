import os

import dj_database_url

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


SECRET_KEY = os.getenv('SECRET_KEY', 'SECRET')

DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'tokenservice',
    's3imageservice',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'exampleapp.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'exampleapp.wsgi.application'


DATABASES = {}
if 'DATABASE_URL' in os.environ:
    DATABASES['default'] = dj_database_url.config()
else:
    DATABASES['default'] = {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


STATIC_URL = '/static/'

###########
# Logging #
###########

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s' # noqa
        },
        'simple': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s',
            'datefmt': '%Y-%m-%d %H:%M',
        },
    },
    'filters': {
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
        'debug_console': {
            'level': 'INFO',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
    },
    'loggers': {
        'tasks': {
            'handlers': ['console'],
            'level': 'INFO',
        },
    },
}

#########################
# s3imageservice settings

S3IMAGESERVICE_API_AUTHENTICATION_CLASS = (
    'tokenservice.authentication.TokenAuthentication'
)

S3IMAGESERVICE_SECRET_KEY = ''
S3IMAGESERVICE_AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
S3IMAGESERVICE_AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
S3IMAGESERVICE_AWS_REGION = 'us-east-2'
S3IMAGESERVICE_S3_UPLOAD_ROOT = 'interactives/uploads/image-service/'

##############
# Staging S3 #
##############
S3IMAGESERVICE_AWS_S3_BUCKET = 'staging.interactives.politico.com'
S3IMAGESERVICE_AWS_S3_STATIC_ROOT = 'https://s3.amazonaws.com/staging.interactives.politico.com' # noqa

#################
# Production S3 #
#################
# S3IMAGESERVICE_AWS_S3_BUCKET = 'interactives.politico.com'
# S3IMAGESERVICE_AWS_S3_STATIC_ROOT = 'https://www.politico.com'
