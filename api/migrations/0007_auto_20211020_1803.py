# Generated by Django 3.2.3 on 2021-10-20 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_collection_collection_logo'),
    ]

    operations = [
        migrations.AddField(
            model_name='collection',
            name='default_colour',
            field=models.CharField(default='#FFFFFF', help_text='Colour in hex e.g. #FFFFFF', max_length=10),
        ),
        migrations.AlterField(
            model_name='colour',
            name='hex_value',
            field=models.CharField(default='#FFFFFF', help_text='Colour in hex e.g. #FFFFFF', max_length=10),
        ),
    ]
