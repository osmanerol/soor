# Generated by Django 3.2.2 on 2021-05-17 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0006_auto_20210516_2207'),
    ]

    operations = [
        migrations.AlterField(
            model_name='instructor',
            name='totalLesson',
            field=models.IntegerField(default=0),
        ),
    ]
