# Generated by Django 3.2.3 on 2021-10-12 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_colour_hex_value'),
    ]

    operations = [
        migrations.AddField(
            model_name='clothing',
            name='header',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='clothing',
            name='description',
            field=models.CharField(default='', max_length=500),
        ),
    ]
