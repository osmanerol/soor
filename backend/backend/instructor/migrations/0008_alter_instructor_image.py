# Generated by Django 3.2.2 on 2021-05-17 14:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0007_alter_instructor_totallesson'),
    ]

    operations = [
        migrations.AlterField(
            model_name='instructor',
            name='image',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]