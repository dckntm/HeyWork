# Generated by Django 3.1.4 on 2020-12-03 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0030_auto_20201203_1442'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(blank=True, default='media/default_avatar.jpg', upload_to='media/'),
        ),
    ]
