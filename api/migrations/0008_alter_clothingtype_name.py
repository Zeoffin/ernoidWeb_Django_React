# Generated by Django 3.2.3 on 2021-10-20 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20211020_1803'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clothingtype',
            name='name',
            field=models.CharField(default='', max_length=30),
        ),
    ]