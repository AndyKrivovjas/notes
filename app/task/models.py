from __future__ import unicode_literals
from django.db import models
from app.category.models import Category
from app.tag.models import Tag


class Color(models.Model):
    name = models.CharField('name', max_length=255)
    value = models.CharField('value', max_length=255)

    def __unicode__(self):
       return self.name


class Task(models.Model):
    title = models.CharField('title', max_length=255)
    text = models.TextField('text')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tags = models.ManyToManyField('self', related_name='tags_to_task', symmetrical=False, through='TagRelation')
    color = models.ForeignKey(Color)
    owner = models.CharField('owner', max_length=255, default='')
    date_added = models.DateTimeField('date_added', blank=True, null=True)
    date_modified = models.DateTimeField('date_modified', blank=True, null=True)

    def __unicode__(self):
       return self.title


class TagRelation(models.Model):
    task = models.ForeignKey(Task)
    tag = models.ForeignKey(Tag)