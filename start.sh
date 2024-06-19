#!/bin/bash

set -e

# Start Daphne for both HTTP and WebSocket traffic
daphne -b 0.0.0.0 -p 10000 django_core.asgi:application &
DAPHNE_PID=$!

# Start Celery worker
celery -A django_core worker --loglevel=info &
CELERY_WORKER_PID=$!

# Start Celery beat scheduler
celery -A django_core beat --loglevel=info --scheduler django_celery_beat.schedulers:DatabaseScheduler &
CELERY_BEAT_PID=$!

# Wait for the processes to finish
wait $DAPHNE_PID
wait $CELERY_WORKER_PID
wait $CELERY_BEAT_PID

# # Start Celery worker
# celery -A django_core worker --loglevel=info &




# # Start Daphne for both HTTP and WebSocket traffic
# daphne -b 127.0.0.1 -p $PORT django_core.asgi:application 

# supervisord -c /etc/supervisor/conf.d/supervisord.conf
# supervisord -c supervisord.conf



# Start uvicorn as the interface server to serve the ASGI application
# uvicorn --host 0.0.0.0 --port 8001 --workers 4 django_core.asgi:application

# Start django server
# python -m gunicorn django_core.asgi:application -k uvicorn.workers.UvicornWorker
