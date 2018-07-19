import logging
import os

from s3imageservice.conf import settings
from s3imageservice.utils.aws import defaults, get_bucket
from celery import shared_task

logger = logging.getLogger('tasks')

OUTPUT_PATH = settings.S3_UPLOAD_ROOT
CACHE_HEADER = str('max-age=604800')  # 1 week


@shared_task(acks_late=True)
def publish_to_aws(filepath, data):

    key = os.path.join(
        OUTPUT_PATH,
        filepath
    )

    bucket = get_bucket()

    bucket.put_object(
        Key=key,
        ACL=defaults.ACL,
        Body=data,
        CacheControl=CACHE_HEADER,
        ContentType='image/jpg'
    )

    logger.info('%s published to AWS.' % (key))
