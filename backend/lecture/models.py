from django.db import models
from category.models import Category

class Lecture(models.Model):
    category = models.ForeignKey(Category, on_delete = models.CASCADE)
    name = models.CharField(max_length = 100)

    def __str__(self):
        return self.name