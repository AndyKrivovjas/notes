from django.contrib import admin

# Register your models here.
from .models import Task, Color


admin.site.register(Task)
admin.site.register(Color)