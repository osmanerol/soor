from django.db import models
import datetime
from user.models import User

class Comment(models.Model):
    student = models.ForeignKey(User, on_delete = models.CASCADE)
    instructor = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'user')
    content = models.TextField()
    created = models.DateField(editable = False)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.content

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = datetime.date.today()
        return super(Comment, self).save(*args, **kwargs)