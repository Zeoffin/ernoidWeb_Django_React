# Generated by Django 3.2.3 on 2021-11-09 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20211109_1406'),
    ]

    operations = [
        migrations.AddField(
            model_name='clothing',
            name='preview_image_live',
            field=models.ImageField(default='', upload_to=''),
        ),
        migrations.AlterField(
            model_name='clothing',
            name='preview_image_back',
            field=models.ImageField(default='', upload_to=''),
        ),
    ]