import json
from channels.generic.websocket import AsyncWebsocketConsumer


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
