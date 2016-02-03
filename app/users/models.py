from __future__ import unicode_literals

from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    #followers = models.ManyToManyField('self', related_name='followees', symmetrical=False)
    def is_authenticated(self):
        return True