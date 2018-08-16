![POLITICO](https://rawgithub.com/The-Politico/src/master/images/logo/badge.png)

# django-s3-image-service
Handle s3 image uploads via API with some sizing and processing options.

### Quickstart

1. Install the app.

  ```
  $ pip install django-s3-image-service
  ```

2. Add the app and its dependencies to your Django project and configure settings for this service and use the recommended CORS setup if you don't already have one. See [Options Explained](#options-explained) for more.

  ```python
  INSTALLED_APPS = [
      # ...
      'corsheaders',
      'storages',
      'rest_framework',
      's3imageservice',
  ]

  MIDDLEWARE = [
      'corsheaders.middleware.CorsMiddleware',
      'django.middleware.common.CommonMiddleware',
      # ... other middleware below
  ]

  ########
  # CORS #
  ########
  if DEBUG:
      CORS_ORIGIN_ALLOW_ALL = True
  else:
      CORS_ORIGIN_WHITELIST = (
          'localhost:8000',
          'localhost:3000',
      )

  #########################
  # s3imageservice settings

  S3IMAGESERVICE_API_AUTHENTICATION_CLASS = ''
  S3IMAGESERVICE_API_PERMISSION_CLASS = ''
  S3IMAGESERVICE_MEDIA_PATH =''
  S3IMAGESERVICE_FILE_MB_LIMIT = 100
  S3IMAGESERVICE_AWS_ACCESS_KEY_ID = ''
  S3IMAGESERVICE_AWS_SECRET_ACCESS_KEY = ''
  S3IMAGESERVICE_AWS_REGION = ''
  S3IMAGESERVICE_AWS_S3_BUCKET = ''
  S3IMAGESERVICE_AWS_S3_STATIC_ROOT = ''
  S3IMAGESERVICE_S3_UPLOAD_ROOT = ''
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

Non explicitly sized requests return a response like this:
```json
{
    "success": "ok",
    "format": "jpg",
    "canonical": "https://s3.amazonaws.com/your-s3-bucket-name/image-service/2018/7/26/4d1fd7e6ab.jpg",
    "urls": [
        "https://your-s3-domain.com/image-service/2018/7/19/7885aae30f.jpg"
    ],
    "img": {
        "src": "https://your-s3-domain.com/image-service/2018/7/19/7885aae30f.jpg"
    }
}
```

An explicitly sized request with the sizes `[300, 500, 800]` will return a response like this:
```json
{
    "success": "ok",
    "format": "jpg",
    "canonical": "https://s3.amazonaws.com/your-s3-bucket-name/image-service/2018/7/26/4d1fd7e6ab-800.jpg",
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
        "srcset": "https://your-s3-domain.com/image-service/2018/7/19/cb0da54b11-300.jpg 300w, https://your-s3-domain.com/image-service/2018/7/19/cb0da54b11-500.jpg 500w, https://your-s3-domain.com/image-service/2018/7/19/cb0da54b11-800.jpg 800w",
        "sizes": "(max-width: 300px) 300px, (max-width: 500px) 500px, 800px",
        "src": "https://your-s3-domain.com/image-service/2018/7/19/cb0da54b11-800.jpg"
    }
}
```

### Options Explained
- `S3IMAGESERVICE_API_AUTHENTICATION_CLASS`: An authentication scheme to use for your upload API view. See the official [Django REST docs on this](http://www.django-rest-framework.org/api-guide/authentication/#setting-the-authentication-scheme) for more, or use [POLITICO's token authentication service](https://github.com/The-Politico/django-politico-token-service) to handle this. Defaults to `rest_framework.authentication.BasicAuthentication`.

- `S3IMAGESERVICE_API_PERMISSION_CLASS`: A permissions class to outline access to your API view. See the official [Django REST docs on this](http://www.django-rest-framework.org/api-guide/permissions/) for more. Defaults to `rest_framework.permissions.IsAuthenticated`.

- `S3IMAGESERVICE_MEDIA_PATH`: The path to a local directory in which to save local media files as they are processed. This path is appended to your Django `MEDIA_ROOT`. Defaults to `''`.

- `S3IMAGESERVICE_FILE_MB_LIMIT`: The limit (in MB) on image file sizes to be processed by the service. Note that your server may have its own limit which will stop uploaded images from making it to the view. Defaults to `100`.

- `S3IMAGESERVICE_AWS_ACCESS_KEY_ID`: The access key ID to your AWS S3 bucket. See the official [AWS docs on Access Keys](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) for more. Defaults to `None`.

- `S3IMAGESERVICE_AWS_SECRET_ACCESS_KEY`: The secret access key to your AWS S3 bucket. See the official [AWS docs on Access Keys](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) for more. Defaults to `None`.

- `S3IMAGESERVICE_AWS_REGION`: The region of your AWS S3 bucket. See the official [AWS docs on Regions and Availability Zones](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html) for more. Defaults to `None`.

- `S3IMAGESERVICE_AWS_S3_BUCKET`: The name of your AWS S3 bucket. Defaults to `None`.

- `S3IMAGESERVICE_AWS_S3_STATIC_ROOT`: The domain mapped to the root of your AWS S3 bucket using tools like [CloudFront](https://aws.amazon.com/cloudfront/). Defaults to `None`.

- `S3IMAGESERVICE_S3_UPLOAD_ROOT`: The root to your upload directory in your AWS S3 bucket. Note that images will not be uploaded in this directory. Instead this directory will serve as the root for the date-scheme directory structure. Defaults to `uploads/s3imageservice`.


### Pathing Explained
Django S3 Image service builds multiple paths based on the options set to process and upload your images. For easy readability, those paths are reproduced below using the appropriate setting names in `ALL_CAPS` and variables produced by the service ``{in_curly_quotes}``.

##### Local Media Upload
Images are first uploaded to a local directory in order to be processed by the celery task. The proper path is sent to the task and the file is deleted once the processing is complete, so you shouldn't need to worry about it. But if you're wondering why there's an empty directory in your media folder, this is why. Here's the path to the temporary file:
```
BASE_DIR / MEDIA_ROOT / S3IMAGESERVICE_MEDIA_PATH / {hash}.jpg
```

##### Response: Canonical URL
Once images are sent to the view, it will optimistically return a response to where the images will live on S3. The `canonical` property in the response will return a URL for the largest-in-size image using the root S3 bucket name and AWS's default pathing. This is useful to get around the cached version of images if you're using something like CloudFront in order to verify that an image has been uploaded without causing a 404 to cache in its place.

This path also serves to illustrate the year/month/day pathing generated by the service to avoid image duplication. No 10-digit random hash should repeat on a given day of the year. Here's a sample canonical URL in a response:
```
https://s3.amazonaws.com / S3IMAGESERVICE_AWS_S3_BUCKET / S3IMAGESERVICE_S3_UPLOAD_ROOT / {year} / {month} / {day} / {hash}-{pixel_size}.jpg
```

##### Response URL(s)
Once an image is uploaded to S3, the optimistic response will also return a set of URLs for each new size in the `urls` property. These are similar to the canonical URL except that they use `S3IMAGESERVICE_AWS_S3_STATIC_ROOT` as the domain in order to take advantage of potential caching. Here's a sample of one URL inside the `urls` array:
```
S3IMAGESERVICE_AWS_S3_STATIC_ROOT / S3IMAGESERVICE_S3_UPLOAD_ROOT / {year} / {month} / {day} / {hash}-{pixel_size}.jpg
```

*Note: Even if you don't use an alternative domain for your S3 bucket, you must still fill out the `S3IMAGESERVICE_AWS_S3_STATIC_ROOT` option. Consider using `https://s3.amazonaws.com/name-of-your-bucket/` as that root if this is the case.*  


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
