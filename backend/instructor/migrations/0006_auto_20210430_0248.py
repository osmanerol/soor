# Generated by Django 3.1.7 on 2021-04-29 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0005_auto_20210427_1311'),
    ]

    operations = [
        migrations.AlterField(
            model_name='instructor',
            name='status',
            field=models.IntegerField(default=0, editable=False),
        ),
    ]
