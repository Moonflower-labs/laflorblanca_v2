# Generated by Django 5.0.4 on 2024-05-14 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='out_of_stock',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='item',
            name='price_id',
            field=models.CharField(default='dssfvfvfvfvfv', max_length=100),
            preserve_default=False,
        ),
    ]
