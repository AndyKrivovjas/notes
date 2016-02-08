from datetime import datetime

from app.category.models import Category
from app.tag.models import Tag
from django.utils.timezone import now
from .models import Task, Color, TagRelation
from app.category.serializers import CategorySerializer
from app.tag.serializers import TagSerializer
from app.users.serializers import UserSerializer
from rest_framework import serializers


class ColorSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super(serializers.ModelSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = Color
        fields = ('id', 'name', 'value')


class TaskCreateUpdateSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super(serializers.ModelSerializer, self).__init__(*args, **kwargs)

    @staticmethod
    def add(owner, validated_data):
        task = Task(title=validated_data['title'], owner=owner, text=validated_data['text'], date_added=now(), date_modified=now())
        if validated_data.get('category'):
            task.category = Category.objects.get(pk=validated_data.get('category'))
        if validated_data.get('color'):
            task.color = Color.objects.get(pk=validated_data.get('color'))
        task.save()

        if validated_data.get('tags'):
            for tag_id in validated_data.get('tags').split(','):
                relation = TagRelation(task=task, tag=Tag.objects.get(pk=tag_id))
                relation.save()
        return task

    @staticmethod
    def update(task, validated_data):
        if validated_data.get('title'):
            task.title = validated_data.get('title')
        if validated_data.get('text'):
            task.text = validated_data.get('text')
        if validated_data.get('category'):
            task.category = Category.objects.get(pk=validated_data.get('category'))
        if validated_data.get('color'):
            task.color = Color.objects.get(pk=validated_data.get('color'))
        task.date_modified = now()
        task.save()

        if validated_data.get('tags'):
            relation = TagRelation.objects.filter(task=task).delete()
            print relation
            for tag_id in validated_data.get('tags').split(','):
                relation = TagRelation(task=task, tag=Tag.objects.get(pk=tag_id))
                relation.save()

        task.save()
        return task

    class Meta:
        model = Task
        fields = ('id', 'title', 'text', 'category', 'tags', 'color', 'owner', 'date_added', 'date_modified')


class TaskSerializer(serializers.ModelSerializer):

    tags = TagSerializer(many=True)
    category = CategorySerializer()
    color = ColorSerializer()
    owner = UserSerializer()

    def __init__(self, *args, **kwargs):
        super(serializers.ModelSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = Task
        fields = ('id', 'title', 'text', 'category', 'tags', 'color', 'owner', 'date_added', 'date_modified')