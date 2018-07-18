![POLITICO](https://rawgithub.com/The-Politico/src/master/images/logo/badge.png)

# django-s3-image-service

### Quickstart

1. Install the app and its dependencies.

  ```
  $ pip install django-s3-image-service djangorestframework boto3 Pillow celery
  ```

2. Add the app to your Django project and configure settings.

  ```python
  INSTALLED_APPS = [
      # ...
      'rest_framework',
      's3imageservice',
  ]

  #########################
  # s3imageservice settings

  S3IMAGESERVICE_API_AUTHENTICATION_CLASS = ('')
  S3IMAGESERVICE_AWS_ACCESS_KEY_ID = ''
  S3IMAGESERVICE_AWS_SECRET_ACCESS_KEY = ''
  S3IMAGESERVICE_AWS_REGION = ''
  S3IMAGESERVICE_S3_UPLOAD_ROOT = ''
  S3IMAGESERVICE_AWS_S3_BUCKET = ''
  S3IMAGESERVICE_AWS_S3_STATIC_ROOT = ''
  ```

### Developing

##### Running a development server

Developing python files? Move into example directory and run the development server with pipenv.

  ```
  $ cd example
  $ pipenv run python manage.py runserver
  ```

##### Setting up a PostgreSQL database

1. Run the make command to setup a fresh database.

  ```
  $ make database
  ```

2. Add a connection URL to the `.env` file.

  ```
  DATABASE_URL="postgres://localhost:5432/s3imageservice"
  ```

3. Run migrations from the example app.

  ```
  $ cd example
  $ pipenv run python manage.py migrate
  ```
