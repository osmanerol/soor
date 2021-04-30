from django.db import models
from instructor.models import Instructor
from student.models import Student
from user.models import User
from django.utils import timezone

class Comment(models.Model):
    student = models.ForeignKey(User, on_delete = models.CASCADE)
    instructor = models.ForeignKey(Instructor, on_delete = models.CASCADE, related_name = 'instructor')
    content = models.TextField()
    created = models.DateField(editable = False)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.content

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        return super(Comment, self).save(*args, **kwargs)