from django.core.management.base import BaseCommand
from django_celery_beat.models import PeriodicTask, CrontabSchedule, IntervalSchedule
import json


class Command(BaseCommand):
    help = 'Add periodic tasks to the scheduler'

    def handle(self, *args, **kwargs):

        schedule, created = CrontabSchedule.objects.get_or_create(
            minute=0,
            hour=0,
            day_of_month=1,
        )
        PeriodicTask.objects.get_or_create(
            crontab=schedule,
            name='Monthly question count reset',
            task='members.tasks.reset_question_count',
            defaults={
                'crontab': schedule,
                'name': 'Reset question count',
                'task': 'members.tasks.reset_question_count',
                'kwargs': json.dumps({})
            }
        )

        self.stdout.write(self.style.SUCCESS(
            'Successfully added periodic task'))
