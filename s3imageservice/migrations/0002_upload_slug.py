# Generated by Django 2.2.5 on 2019-09-27 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('s3imageservice', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='upload',
            name='slug',
            field=models.CharField(default='', max_length=50, unique=True),
            preserve_default=False,
        ),
    ]
