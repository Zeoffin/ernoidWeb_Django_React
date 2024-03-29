# Generated by Django 3.2.3 on 2021-05-30 23:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ClothingType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=30, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=30, unique=True)),
                ('description', models.CharField(default='', max_length=200)),
                ('released', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Colour',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=30, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Clothing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('preview_image', models.ImageField(upload_to='')),
                ('description', models.CharField(default='', max_length=200)),
                ('collection', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.collection')),
                ('colour', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.colour')),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.clothingtype')),
            ],
        ),
    ]
