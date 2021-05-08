from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length = 50, unique = False)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    is_instructor = models.BooleanField(default = False)
    is_student = models.BooleanField(default = False)

    def __str__(self):
        return self.email