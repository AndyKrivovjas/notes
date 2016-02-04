from datetime import datetime
from django.db import models
from django.utils.timezone import now

# Create your models here.
class Tag(models.Model):
    name = models.CharField('name', max_length=255, default='')
    creator = models.CharField('creator', max_length=255, default='')
    date_added = models.DateField('date_added', max_length=255, default=now)

    def __unicode__(self):
       return self.name
