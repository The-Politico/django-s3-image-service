import io
import os
import logging
from PIL import Image
from celery import shared_task

from .aws import publish_to_aws

logger = logging.getLogger('tasks')


@shared_task(acks_late=True)
def process_images(config):
    """
    Creates multiple sizes of an image as stated in config["sizes"] and
    processes them as stated in config["compression"], config["quality"], and
    config["progressive"]. Calls function to upload to S3. Then deletes image.
    """
    logger.info('Processing image...')

    # Open the image
    base_img = Image.open(config["path"]+config["filename"])

    # Create multiple sizes
    for size in config["sizes"]:
        copy = base_img.copy()
        copy.thumbnail((size["size"], base_img.height), Image.ANTIALIAS)

        imgByteArr = io.BytesIO()
        copy.save(
            imgByteArr,
            format="JPEG",
            quality=config["quality"],
            optimize=config["compression"],
            progressive=config["progressive"]
        )

        # Upload each size to s3
        publish_to_aws(size["filename"], imgByteArr.getvalue())

    # Delete temporary image
    os.remove(os.path.join(config["path"], config["filename"]))
