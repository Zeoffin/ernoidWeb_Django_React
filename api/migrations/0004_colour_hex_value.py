# Generated by Django 3.2.3 on 2021-10-12 20:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20211012_2001'),
    ]

    operations = [
        migrations.AddField(
            model_name='colour',
            name='hex_value',
            field=models.CharField(default='#FFFFFF', max_length=10),
        ),
    ]
