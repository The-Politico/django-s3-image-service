from django.conf import settings
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes
from rest_framework.response import Response
from operator import itemgetter
from PIL import Image
import json
import os

FILE_SIZE_MB_LIMIT = 100
FILE_SIZE_LIMIT = FILE_SIZE_MB_LIMIT * 1000 * 1000
FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']


@parser_classes((MultiPartParser, ))
class Upload(APIView):
    def post(self, request, format=None):
        """
        Handles image uploads, processes them, and returns image and path data
        if successful.
        """
        file = request.FILES["img"]
        sizes = json.loads(request.data["sizes"])
        compression = request.data.get("compression", "")
        progressive = request.data.get("progressive", "")

        if(not self.validation(file)):
            return Response("Invalid")

        resp_data = self.process(
            file,
            sizes,
            compression=compression,
            progressive=progressive
        )

        return Response(resp_data)

    def validation(self, file):
        """
        Validates an image based on predefined paramters of type and size.
        """
        if(file.size > FILE_SIZE_LIMIT):
            return False

        if(file.content_type not in FILE_TYPES):
            return False

        return True

    def process(self, file, sizes, compression=None, progressive=None):
        """
        Upload and creates images for each size provided.
        Returns response with image and path data.
        """
        # Get base file and filename
        base_name, extension = os.path.splitext(file.name)
        base_img = Image.open(file)

        # Convert color options for PNGs
        if(file.content_type == 'image/png'):
            base_img = base_img.convert('RGB')

        # Create multiple sizes
        images = []
        for size in sizes:
            filename = "imgs/%s-%s.jpg" % (base_name, size)
            copy = base_img.copy()
            copy.thumbnail((size, base_img.height), Image.ANTIALIAS)
            images.append({"filename": filename, "size": size, "file": copy})

        # Handle options
        compression = False if compression.lower() == "false" else True
        progressive = False if progressive.lower() == "false" else True
        quality = 80 if compression else 100

        # Save new files (temporary)
        for img in images:
            img["file"].save(
                img["filename"],
                "JPEG",
                quality=quality,
                optimize=compression,
                progressive=progressive
            )

        # Create response
        sorted_imgs = sorted(images, key=itemgetter('size'))
        base_url = settings.S3IMAGESERVICE_BASE_URL

        resp_urls = [base_url + img["filename"] for img in sorted_imgs]
        resp_sizes = [img["size"] for img in sorted_imgs]

        resp_srcset = str([
            "%s%s %iw" % (base_url, img["filename"], img["size"])
            for img in sorted_imgs
        ])

        resp_img_sizes = []
        for idx, img in enumerate(sorted_imgs):
            if(idx != len(sorted_imgs)-1):
                resp_img_sizes.append("(max-width: {s}px) {s}px".format(
                    s=img["size"]
                ))
            else:
                resp_img_sizes.append("{s}px".format(
                    s=img["size"]
                ))
        resp_img_sizes = str(resp_img_sizes)

        return {
          "success": "ok",
          "format": "jpg",
          "urls": resp_urls,
          "sizes": resp_sizes,
          "img": {
            "srcset": resp_srcset,
            "sizes": resp_img_sizes,
            "src": resp_urls[-1]
          }
        }
