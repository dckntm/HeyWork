# Generated by Django 3.1.4 on 2020-12-03 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0025_auto_20201203_1424'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(blank=True, default='media/default_avatar.jpg', upload_to='media/'),
        ),
    ]
