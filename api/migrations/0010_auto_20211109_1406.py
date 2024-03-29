# Generated by Django 3.2.3 on 2021-11-09 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_clothing_stripe_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='clothing',
            name='preview_image_back',
            field=models.ImageField(default='/static/images/branding/ERNOID_Logo_Black.png', upload_to=''),
        ),
        migrations.AlterField(
            model_name='clothing',
            name='description',
            field=models.TextField(default='Description field', max_length=500),
        ),
    ]
