from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_core.settings')

app = Celery('django_core')

app.config_from_object('django.conf:settings', namespace='CELERY')

# load task modules from all registered django app configs.
app.autodiscover_tasks(['members'])


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
