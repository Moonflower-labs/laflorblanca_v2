#!/bin/bash


# Start Celery worker
celery -A django_core worker --loglevel=info --detach --pidfile=celeryworker.pid & 

# Start Celery beat scheduler
celery -A django_core beat --loglevel=info --scheduler django_celery_beat.schedulers:DatabaseScheduler --detach --pidfile=celerybeat.pid &

# Start django server
python -m gunicorn django_core.asgi:application -k uvicorn.workers.UvicornWorker
