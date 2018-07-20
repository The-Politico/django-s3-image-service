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

  S3IMAGESERVICE_API_AUTHENTICATION_CLASS = ''
  S3IMAGESERVICE_API_PERMISSION_CLASS = ''
  S3IMAGESERVICE_FILE_MB_LIMIT = 100
  S3IMAGESERVICE_AWS_ACCESS_KEY_ID = ''
  S3IMAGESERVICE_AWS_SECRET_ACCESS_KEY = ''
  S3IMAGESERVICE_AWS_REGION = ''
  S3IMAGESERVICE_S3_UPLOAD_ROOT = ''
  S3IMAGESERVICE_AWS_S3_BUCKET = ''
  S3IMAGESERVICE_AWS_S3_STATIC_ROOT = ''
  ```

### Services
**Upload To S3**
```javascript
const img = fileInputNode.files[0];
const sizes = [300, 500, 800]; // optional
const compression = false; // optional

const formData = new FormData();
formData.append('img', img);
formData.append('sizes', JSON.stringify(sizes)); // optional
formData.append('compression', JSON.stringify(compression)); // optional

fetch('https://your-api.com/', {
  method: 'POST',
  headers: {
    Authorization: `Token ${YOUR_TOKEN}`, // or whatever auth strategy you use
  },
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log(data);
});
```

You may also pass values for the following params in body:

| Option        | Description | Type | Default | Example |
| ------------- | ----------- | ---- | --------| --------|
| sizes     | An array of sizes to resize the image to. | int[] | None | [300, 500, 800]|
| compression | Web optimize and compress jpg to 80% quality. | boolean | True | True
| progressive | Convert image to a progressive jpg. | boolean | True | True

Non explicitly sized requests return a response like this.
```json
{
    "success": "ok",
    "format": "jpg",
    "urls": [
        "https://your-s3-domain.com/image-service/2018/7/19/7885aae30f.jpg"
    ],
    "img": {
        "src": "https://your-s3-domain.com/image-service/2018/7/19/7885aae30f.jpg"
    }
}
```

An explicitly sized request with the sizes `[300, 500, 800]` will return a response like this.
```json
{
    "success": "ok",
    "format": "jpg",
    "urls": [
        "https://your-s3-domain.com/image-service/2018/7/19/cb0da54b11-300.jpg",
        "https://your-s3-domain.com/image-service/2018/7/19/cb0da54b11-500.jpg",
        "https://your-s3-domain.com/image-service/2018/7/19/cb0da54b11-800.jpg"
    ],
    "sizes": [
        300,
        500,
        800
    ],
    "img": {
        "srcset": "'https://your-s3-domain.com/image-service/2018/7/19/cb0da54b11-300.jpg 300w', 'https://your-s3-domain.com/image-service/2018/7/19/cb0da54b11-500.jpg 500w', 'https://your-s3-domain.com/image-service/2018/7/19/cb0da54b11-800.jpg 800w'",
        "sizes": "'(max-width: 300px) 300px', '(max-width: 500px) 500px', '800px'",
        "src": "https://your-s3-domain.com/image-service/2018/7/19/cb0da54b11-800.jpg"
    }
}
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
