# Generated by Django 3.1.7 on 2021-04-25 00:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0002_instructor_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='instructor',
            old_name='user',
            new_name='instructor',
        ),
    ]