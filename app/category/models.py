from __future__ import unicode_literals
from django.db import models


class Category(models.Model):
    name = models.CharField('name', max_length=255)
    parent_id = models.IntegerField('parent_id', default=0)
    owner = models.CharField('owner', max_length=255, default='')
    date_added = models.DateTimeField('date_added', blank=True, null=True)
    date_modified = models.DateTimeField('date_modified', blank=True, null=True)
