#!/bin/bash

set -e errexit

# # Start Daphne for both HTTP and WebSocket traffic
# daphne -b 0.0.0.0 -p 10000 django_core.asgi:application

# # Start Celery worker
# celery -A django_core worker --loglevel=info -c 4 &

# # Start Celery beat scheduler
# celery -A django_core beat --loglevel=info --scheduler django_celery_beat.schedulers:DatabaseScheduler &


# supervisord -c /etc/supervisor/conf.d/supervisord.conf
supervisord -c supervisord.conf


# Start django server GUNICORN
# python -m gunicorn django_core.asgi:application -k uvicorn.workers.UvicornWorker
