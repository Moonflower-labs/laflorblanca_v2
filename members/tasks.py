from celery import shared_task
from django.utils import timezone
from datetime import timedelta
import logging

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger(__name__)


@shared_task
def log_message():
    logger.info('Periodic task running!!')
