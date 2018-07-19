import json
import io
import uuid
import os
from operator import itemgetter
from PIL import Image
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes
from rest_framework.response import Response
from rest_framework.exceptions import UnsupportedMediaType, ParseError

from s3imageservice.conf import settings
from s3imageservice.celery import process_images

FILE_SIZE_LIMIT = settings.FILE_MB_LIMIT * 1000 * 1000
FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']


@parser_classes((MultiPartParser, ))
class ImageService(APIView):
    """
    Class to handle image uploads.
    """
    authentication_classes = (settings.API_AUTHENTICATION_CLASS,)
    permission_classes = (settings.API_PERMISSION_CLASS,)

    def post(self, request, format=None):
        """
        Handles image uploads, processes them, and returns image and path data
        if successful.
        """

        try:
            file = request.FILES["img"]
        except KeyError:
            raise ParseError(detail="'img' must be provided.")

        sizes = request.data.get("sizes", None)
        if sizes:
            try:
                sizes = json.loads(sizes)
            except json.decoder.JSONDecodeError:
                raise ParseError(
                    detail="'sizes' must be a json-parsable array."
                )

        compression = request.data.get("compression", "")
        progressive = request.data.get("progressive", "")

        self.validation(file, sizes)

        resp_data = self.processform(
            file,
            sizes,
            compression=compression,
            progressive=progressive
        )

        return Response(resp_data)

    def validation(self, file, sizes):
        """
        Validates an image based on predefined paramters of type and size.
        """
        if(file.size > FILE_SIZE_LIMIT):
            raise UnsupportedMediaType(
                file.content_type,
                detail="'img' must be less than %sMB" % FILE_SIZE_MB_LIMIT
            )

        if(file.content_type not in FILE_TYPES):
            raise UnsupportedMediaType(
                file.content_type,
                detail="'img' must be of type(s) %s" % str(FILE_TYPES)
            )

        if sizes:
            if len(sizes) < 1:
                raise ParseError(
                    detail="'sizes' must have at least one size."
                )

            if not isinstance(sizes, list):
                raise ParseError(
                    detail="'sizes' must be a json-parsable array."
                )

            for size in sizes:
                if not isinstance(size, int):
                    raise ParseError(
                        detail="'sizes' must be an array of integers."
                    )

        return True

    def processform(self, file, sizes, compression=None, progressive=None):
        """
        Upload and creates images for each size provided.
        Returns response with image and path data.
        """
        # Get base file and filename
        base_img = Image.open(file)
        hash = uuid.uuid4().hex[0:10]

        # Convert color options for PNGs
        if(base_img.format == 'PNG'):
            base_img = base_img.convert('RGB')

        # Handle options
        compression = False if compression.lower() == "false" else True
        progressive = False if progressive.lower() == "false" else True
        quality = 80 if compression else 100

        # Create multiple sizes
        images = []
        now = datetime.now()
        if sizes:
            for size in sizes:
                filename = "{y}/{m}/{d}/{hash}-{size}.jpg".format(
                    y=now.year,
                    m=now.month,
                    d=now.day,
                    hash=hash,
                    size=size
                )
                images.append({
                    "filename": filename,
                    "size": size
                })
        else:
            filename = "{y}/{m}/{d}/{hash}.jpg".format(
                y=now.year,
                m=now.month,
                d=now.day,
                hash=hash,
            )
            images.append({
                "filename": filename
            })

        # Save image in local media
        file_path = os.path.join(settings.MEDIA_ROOT, settings.MEDIA_PATH)
        if not os.path.exists(file_path):
            os.makedirs(file_path)
        base_filname = "%s.jpg" % hash
        base_img.save(file_path+base_filname, format="JPEG")
        config = {
            "path": file_path,
            "filename": base_filname,
            "compression": compression,
            "progressive": progressive,
            "quality": quality,
            "sizes": images
        }
        process_images.delay(config)

        # Create response
        sorted_imgs = (
            sorted(images, key=itemgetter("size"))
            if "size" in images else images
        )

        base_url = os.path.join(
            settings.AWS_S3_STATIC_ROOT,
            settings.S3_UPLOAD_ROOT
        )

        resp_urls = [base_url + img["filename"] for img in sorted_imgs]

        if sizes:
            # Multiple size response
            resp_sizes = [img["size"] for img in sorted_imgs]

            resp_srcset = str([
                "%s%s %iw" % (base_url, img["filename"], img["size"])
                for img in sorted_imgs
            ])[1:-1]

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
            resp_img_sizes = str(resp_img_sizes)[1:-1]

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

        else:
            # Single size response
            return {
              "success": "ok",
              "format": "jpg",
              "urls": resp_urls,
              "img": {
                "src": resp_urls[-1]
              }
            }
