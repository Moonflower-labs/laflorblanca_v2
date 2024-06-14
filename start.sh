#!/bin/bash


# Start Celery worker
celery -A django_core worker --loglevel=info & 

# Start Celery beat scheduler
celery -A django_core beat --loglevel=info --scheduler django_celery_beat.schedulers:DatabaseScheduler &

# Start Daphne for both HTTP and WebSocket traffic
daphne -b 0.0.0.0 -p 8000 django_core.asgi:application &

# Start uvicorn as the interface server to serve the ASGI application
uvicorn --host 0.0.0.0 --port 8001 --workers 4 --proxy-headers django_core.asgi:application
