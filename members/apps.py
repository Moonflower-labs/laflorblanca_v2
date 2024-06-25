from django.apps import AppConfig
from django.utils.translation import activate


class MembersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'members'
    # verbose_name = 'miembros'

    def ready(self):
        from .signals import comment_created, comment_created_handler
        comment_created.connect(comment_created_handler,
                                dispatch_uid="my_unique_identifier")
