import logging
import json
from channels.generic.websocket import AsyncWebsocketConsumer

logger = logging.getLogger(__name__)


class NotificationsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        message = json.loads(text_data)
        notification_type = message.get('type')

        if notification_type == 'notification':
            await self.send(text_data=json.dumps({
                'type': 'notification',
                # Replace with your actual notification message
                'message': 'This is a notification message.'
            }))

    async def send_notification(self, event):
        message = event.get('message')
        await self.send(text_data=json.dumps({
            'type': 'notification',
            'message': message
        }))


class CommentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = 'comments'
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def new_comment(self, event):
        comment = event['comment']
        await self.send(text_data=json.dumps({
            'type': 'new_comment',
            'comment': comment
        }))
