#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install --upgrade pip && pip install -r requirements.txt

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py migrate

# Add the command to run the custom management command for setting up the periodic task
# python manage.py schedule_tasks
# python manage.py reset_question_count