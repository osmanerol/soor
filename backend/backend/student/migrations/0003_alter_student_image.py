# Generated by Django 3.2.2 on 2021-05-09 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0002_alter_student_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='image',
            field=models.CharField(default=' ', max_length=500),
            preserve_default=False,
        ),
    ]
