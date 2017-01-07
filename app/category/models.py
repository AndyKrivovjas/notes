from app.users.models import User
from django.db import models


class Category(models.Model):
    name = models.CharField('name', max_length=255)
    parent_id = models.IntegerField('parent_id', default=0)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    date_added = models.DateTimeField('date_added', blank=True, null=True)
    date_modified = models.DateTimeField('date_modified', blank=True, null=True)

    def __unicode__(self):
       return self.name
