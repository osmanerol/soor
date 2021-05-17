from django.db import models
from user.models import User
from lecture.models import Lecture
import datetime


class Lesson(models.Model):
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='instructor_user', blank=True)
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lecture_user', blank=True)
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE, related_name='lecture', blank=True)
    link = models.CharField(max_length=100)
    image = models.CharField(max_length=500, null=True, blank=True)
    instructorStatus = models.IntegerField(default=0)
    studentStatus = models.IntegerField(default=0)
    created = models.DateField(editable=False)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.link

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = datetime.date.today()
        return super(Lesson, self).save(*args, **kwargs)
