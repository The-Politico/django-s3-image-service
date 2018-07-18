import io
import logging
from PIL import Image
from celery import shared_task

from .aws import publish_to_aws

logger = logging.getLogger('tasks')


@shared_task(acks_late=True)
def process_images(config):
    """
    Processes an image based on config settings
    """
    logger.info('Processing image...')

    # Open the image
    base_img = Image.open(config["img"])

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

    logger.info('Finish.')
