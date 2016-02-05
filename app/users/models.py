from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    scope = models.CharField('scope', max_length=255, default='users category task tag read write')