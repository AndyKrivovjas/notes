from datetime import datetime
from .models import Tag
from rest_framework import serializers


class TagSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super(serializers.ModelSerializer, self).__init__(*args, **kwargs)

    @staticmethod
    def add(creator, validated_data):
        tag = Tag(name=validated_data['name'], creator=creator)
        tag.save()
        return tag

    class Meta:
        model = Tag
        fields = ('id', 'name')
