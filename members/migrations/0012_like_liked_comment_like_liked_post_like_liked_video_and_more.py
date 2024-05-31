# Generated by Django 5.0.4 on 2024-04-27 09:50

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0011_remove_like_liked_comment_remove_like_liked_post_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='like',
            name='liked_comment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='members.comment'),
        ),
        migrations.AddField(
            model_name='like',
            name='liked_post',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='members.post'),
        ),
        migrations.AddField(
            model_name='like',
            name='liked_video',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='members.videolink'),
        ),
        migrations.AddField(
            model_name='like',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='likes', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='like',
            unique_together={('user', 'liked_comment'), ('user', 'liked_post'), ('user', 'liked_video')},
        ),
    ]
