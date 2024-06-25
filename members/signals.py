from django.dispatch import Signal
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Comment
from asgiref.sync import async_to_sync

comment_created = Signal()


@receiver(post_save, sender=Comment)
def comment_created_handler(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    if created:
        async_to_sync(channel_layer.group_send)(
            'comments',
            {
                'type': 'new_comment',
                'comment': {
                    'id': instance.id,
                    'text': instance.text,
                    'user': instance.user.username,
                },

            }
        )
