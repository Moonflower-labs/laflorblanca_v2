from django.core.management.base import BaseCommand
from django_celery_beat.models import PeriodicTask, CrontabSchedule
import json


class Command(BaseCommand):
    help = 'Add periodic tasks to the scheduler'

    def handle(self, *args, **kwargs):

        schedule, created = CrontabSchedule.objects.get_or_create(
            minute='*/1',  # every minute
            hour='*',
            day_of_week='*',
            day_of_month='*',
            month_of_year='*',
        )
        PeriodicTask.objects.get_or_create(
            crontab=schedule,
            name='Log a msg every minute',
            task='members.tasks.log_message',
            defaults={
                'crontab': schedule,
                'name': 'Log msg every minute',
                'task': 'members.tasks.log_message',
                'kwargs': json.dumps({})
            }
        )

        self.stdout.write(self.style.SUCCESS(
            'Successfully added periodic task'))
