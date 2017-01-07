from datetime import datetime
from app.users.models import User
from .models import Tag
from rest_framework import serializers


class TagSerializer(serializers.ModelSerializer):

    @staticmethod
    def add(user, validated_data):
        tag = Tag(name=validated_data['name'], owner=user)
        tag.save()
        return tag

    @staticmethod
    def update(tag, validated_data):
        if validated_data.get('name'):
            tag.name = validated_data.get('name')
        tag.date_modified = datetime.now()

        tag.save()
        return tag

    @staticmethod
    def add_defaults(creator):
        default_tags = ['Work', 'Arrangements']
        for tag in default_tags:
            TagSerializer.add(creator, {'name': tag})

    class Meta:
        model = Tag
        fields = ('id', 'name',)
