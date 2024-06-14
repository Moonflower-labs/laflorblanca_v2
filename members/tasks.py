from celery import shared_task
from django.utils import timezone
from datetime import timedelta
import logging
from .models import UserProfile
from django.db import transaction

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger(__name__)


@shared_task
def log_message():
    logger.info('Periodic task running!!')


# @shared_task
# def reset_question_count():
#     UserProfile.objects.update(
#         basic_used_questions=0, tarot_used_questions=0, live_used_questions=0)
#     logger.info('Question count reset!!')

@shared_task
def reset_question_count():
    try:
        with transaction.atomic():
            user_profiles = UserProfile.objects.all()
            for user_profile in user_profiles:
                user_profile.basic_used_questions = 0
                user_profile.tarot_used_questions = 0
                user_profile.live_used_questions = 0
                user_profile.save()

        logger.info('Question count reset successfully')
    except Exception as e:
        logger.exception(
            'An error occurred while resetting question count: %s', str(e))
