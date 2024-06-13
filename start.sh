# Start Celery worker
celery -A django_core worker --loglevel=info & 

# Start Celery beat scheduler
celery -A django_core beat --loglevel=info --scheduler django_celery_beat.schedulers:DatabaseScheduler

# Start django server
python -m gunicorn django_core.asgi:application -b 0.0.0.0:8000 -k uvicorn.workers.UvicornWorker
