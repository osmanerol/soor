# Generated by Django 3.2.2 on 2021-05-09 07:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lecture', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Instructor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='post')),
                ('slug', models.SlugField(editable=False, max_length=100, unique=True)),
                ('status', models.IntegerField(default=0, editable=False)),
                ('university', models.CharField(max_length=100)),
                ('department', models.CharField(max_length=100)),
                ('job', models.CharField(max_length=100)),
                ('rate', models.FloatField(default=0)),
                ('totalLesson', models.IntegerField(default=0, editable=False)),
                ('totalComment', models.IntegerField(default=0, editable=False)),
                ('lessonPrice', models.IntegerField(default=0)),
                ('about', models.TextField()),
                ('balance', models.FloatField(default=0, editable=False)),
                ('lectures', models.ManyToManyField(blank=True, to='lecture.Lecture')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
