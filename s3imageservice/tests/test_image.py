import crayons
from io import BytesIO
import tempfile
import requests
from PIL import Image
from django.test import Client, TestCase
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.files.uploadhandler import TemporaryFileUploadHandler
from django.test.client import encode_file, RequestFactory
from s3imageservice.views import ImageService

from tokenservice.models import TokenApp

prefix = crayons.green('\ns3imageservice: ')
suffix = crayons.green(' ✓')



def get_temporary_image():
    bio = BytesIO()
    size = (200,200)
    color = (255,0,0,0)
    image = Image.new("RGB", size, color)
    image.save(bio, format='JPEG')
    # image_file = InMemoryUploadedFile(notio, None, 'foo.jpg', 'jpeg', len(notio), None)
    # image_file = TemporaryFileUploadHandler.handle_raw_input(bio)
    # image_file.seek(0)
    return bio


class ImageTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        TokenApp.objects.create(app_name='test_app')

    def test_post(self):
        c = Client()
        url = reverse('s3imageservice:upload')
        test_app = TokenApp.objects.get(app_name='test_app')

        # image = Image.new('RGB', (100, 100))
        # tmp_file = tempfile.NamedTemporaryFile(suffix='.jpg', delete=False)
        # image.save(tmp_file, format='JPEG')

        # request = self.factory.post('/', HTTP_AUTHORIZATION='Token {}'.format(test_app.token))
        # request.FILES['img'] = tmp_file
        # request.FILES['img'].read()
        #
        # response = ImageService.as_view()(request)

        tmp_file = get_temporary_image()
        test = encode_file(tmp_file)

        print(test)

        # print(test_app.token)
        # files = {'file': open('test_files/img.jpg', 'rb')}
        # response = requests.post(
        #     'http://localhost:8888/',
        #     files=files,
        #     headers={'Authorization': 'Token {}'.format(test_app.token)}
        # )

        # response = c.post(
        #     url,
        #     {
        #         'img': tmp_file,
        #         'test': 'hello'
        #     },
        #     # format="multipart/form-data",
        #     # content_type='multipart/form-data',
        #     HTTP_AUTHORIZATION='Token {}'.format(test_app.token)
        # )

        print(prefix, 'Test twitter', suffix)
        self.assertEqual(response.status_code, 200)
