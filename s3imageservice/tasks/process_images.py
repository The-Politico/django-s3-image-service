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
    upload_imgs = []

    # Create multiple sizes
    if "size" in config["sizes"][0]:
        for size in config["sizes"]:
            copy = base_img.copy()
            copy.thumbnail((size["size"], base_img.height), Image.ANTIALIAS)
            upload_imgs.append({"filename": size["filename"], "file": copy})

    # Or upload the one size
    else:
        upload_imgs.append({
            "filename": config["sizes"][0]["filename"],
            "file": base_img
        })

    # Process and upload to s3
    for img in upload_imgs:
        imgByteArr = io.BytesIO()

        img["file"].save(
            imgByteArr,
            format="JPEG",
            quality=config["quality"],
            optimize=config["compression"],
            progressive=config["progressive"]
        )

        publish_to_aws(img["filename"], imgByteArr.getvalue())

    # Delete temporary image
    os.remove(os.path.join(config["path"], config["filename"]))
