from django.db import models
from core.models import User
from django.conf import settings
from lecture.models import Lecture
from django.utils.text import slugify

class Teacher(models.Model):
    teacher = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete = models.CASCADE)
    image = models.ImageField(upload_to = 'post', null = True, blank = True)
    slug = models.SlugField(unique = True, max_length = 100, editable = False)
    university = models.CharField(max_length = 100)
    department = models.CharField(max_length = 100)
    job = models.CharField(max_length = 100)
    lessonPrice = models.IntegerField(default = 0)
    rate = models.FloatField(default = 0, editable = False)
    lessons = models.ManyToManyField(Lecture)
    about = models.TextField()

    def __str__(self):
        return self.teacher.email

    def remove_nonenglish_character(self, temp_slug):
        temp_slug = temp_slug.replace('ı','i')
        temp_slug = temp_slug.replace('ö','o')
        temp_slug = temp_slug.replace('ü','u')
        temp_slug = temp_slug.replace('ş','s')
        temp_slug = temp_slug.replace('ç','c')
        return temp_slug

    def get_slug(self):
        slug = '{}-{}'.format(self.teacher.first_name.lower(), self.teacher.last_name.lower())
        slug = self.remove_nonenglish_character(slug)
        unique = slug
        number = 1
        while Teacher.objects.filter(slug = unique ):
            unique = '{}-{}'.format(slug, number)
            number += 1
        return unique

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = self.get_slug()
        return super(Teacher, self).save(*args, **kwargs)