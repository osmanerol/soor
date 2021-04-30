from django.db import models
from django.conf import settings
from user.models import User
from django.utils.text import slugify
from django.db.models.signals import post_save
from django.dispatch import receiver

class Student(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete = models.CASCADE)
    image = models.ImageField(upload_to = 'post', null = True, blank = True)
    slug = models.SlugField(unique = True, max_length = 100, editable = False)  
    credit = models.FloatField(default = 0)

    def __str__(self):
        full_name = '{} {}'.format(self.user.first_name, self.user.last_name)
        return full_name

    def remove_nonenglish_character(self, temp_slug):
        temp_slug = temp_slug.replace('ı','i')
        temp_slug = temp_slug.replace('ö','o')
        temp_slug = temp_slug.replace('ü','u')
        temp_slug = temp_slug.replace('ş','s')
        temp_slug = temp_slug.replace('ç','c')
        return temp_slug

    def get_slug(self):
        slug = '{}-{}'.format(self.user.first_name.lower(), self.user.last_name.lower())
        slug = self.remove_nonenglish_character(slug)
        unique = slug
        number = 1
        while Student.objects.filter(slug = unique):
            unique = '{}-{}'.format(slug, number)
            number += 1
        return unique
        
    def save(self, *args, **kwargs):
        if(not self.id):
            self.slug= self.get_slug()
        return super(Student, self).save(*args, **kwargs)

@receiver(post_save, sender = User)
def create_student_profile(sender, instance, created, **kwargs):
    if not created:
        return
    if(instance.is_student):
        Student.objects.create(user = instance)