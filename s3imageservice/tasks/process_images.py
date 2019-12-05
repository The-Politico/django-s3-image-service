import io
import os
import logging
from PIL import Image
from celery import shared_task

from .aws import publish_to_aws

logger = logging.getLogger("tasks")


@shared_task(acks_late=True)
def process_images(config):
    """
    Creates multiple sizes of an image as stated in config["sizes"] and
    processes them as stated in config["compression"], config["quality"], and
    config["progressive"]. Calls function to upload to S3. Then deletes image.
    """
    # Open the image
    logger.info(
        "process_image.py: Opening local file at {}.".format(
            config["path"] + config["filename"]
        )
    )
    base_img = Image.open(config["path"] + config["filename"])
    upload_imgs = []

    # Create multiple sizes
    if "size" in config["sizes"][0]:
        logger.info("Creating multiple sizes.")
        for size in config["sizes"]:
            logger.info("Creating size: {}.".format(size["size"]))
            copy = base_img.copy()
            copy.thumbnail((size["size"], base_img.height), Image.ANTIALIAS)
            upload_imgs.append({"filename": size["filename"], "file": copy})

    # Or upload the one size
    else:
        logger.info("Processing single size.")
        upload_imgs.append(
            {"filename": config["sizes"][0]["filename"], "file": base_img}
        )

    # Process and upload to s3
    for img in upload_imgs:
        imgByteArr = io.BytesIO()
        img["file"].save(
            imgByteArr,
            format=config["format"],
            quality=config["quality"],
            optimize=config["compression"],
            progressive=config["progressive"],
        )

        logger.info("Uploading to S3...")
        publish_to_aws(img["filename"], imgByteArr.getvalue())

    # Delete temporary image
    logger.info(
        "Deleting temporary image file: {}.".format(
            config["path"] + config["filename"]
        )
    )
    os.remove(os.path.join(config["path"], config["filename"]))
