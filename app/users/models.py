from __future__ import unicode_literals
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    #followers = models.ManyToManyField('self', related_name='followees', symmetrical=False)
    def __init__(self, *args, **kwargs):
        super(AbstractUser, self).__init__(*args, **kwargs)
    pass