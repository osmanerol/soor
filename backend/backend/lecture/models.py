from django.db import models
from django.db.models import Model
from category.models import Category

class Lecture(Model):
    category = models.ForeignKey(Category, on_delete = models.CASCADE)
    name = models.CharField(max_length = 50)

    def __str__(self):
        return self.name