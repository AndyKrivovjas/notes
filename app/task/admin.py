from django.contrib import admin

# Register your models here.
from .models import Task, Color
from app.category.models import Category
from app.tag.models import Tag

class CategoryProxy(Category):
    class Meta:
        proxy = True

class TagProxy(Tag):
    class Meta:
        proxy = True

class TaskProxy(Task):
    class Meta:
        proxy = True

class ColorProxy(Color):
    class Meta:
        proxy = True

# admin.site.register(CategoryProxy)
# admin.site.register(TagProxy)
# admin.site.register(TaskProxy)
# admin.site.register(ColorProxy)

admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Task)
admin.site.register(Color)