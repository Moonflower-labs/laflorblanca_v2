# Generated by Django 5.0.4 on 2024-06-10 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0003_alter_review_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='videolink',
            name='videoId',
            field=models.CharField(default='vi1233', max_length=255),
            preserve_default=False,
        ),
    ]
