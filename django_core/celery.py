from __future__ import absolute_import, unicode_literals
import logging
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_core.settings')

app = Celery('django_core')

app.config_from_object('django.conf:settings', namespace='CELERY')

# load task modules from all registered django app configs.
app.autodiscover_tasks()

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.task(bind=True)
def debug_task(self):
    logger.info(f'Request: {self.request!r}')
