from datetime import datetime
from django.db import models
from django.utils.timezone import now
from app.users.models import User


# Create your models here.
class Tag(models.Model):
    name = models.CharField('name', max_length=255, default='')
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    date_added = models.DateField('date_added', max_length=255, default=now)
    date_modified = models.DateField('date_modified', max_length=255, default=now)

    def __unicode__(self):
       return self.name
