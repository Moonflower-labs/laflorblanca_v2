# Generated by Django 5.0.4 on 2024-05-06 22:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0015_remove_basicquestion_info_basicquestion_age_group_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='premiumquestion',
            name='info',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='premiumquestion',
            name='name',
            field=models.CharField(blank=True, max_length=80, null=True),
        ),
    ]
