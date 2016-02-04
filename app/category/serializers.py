from datetime import datetime
from .models import Category
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super(serializers.ModelSerializer, self).__init__(*args, **kwargs)

    @staticmethod
    def add(owner, validated_data):
        category = Category(name=validated_data['name'], owner=owner, date_added=datetime.now(), date_modified=datetime.now())
        category.parent_id = validated_data.get('parent_id') or 0
        category.save()
        return category

    @staticmethod
    def update(category, validated_data):
        if validated_data.get('name'):
            category.name = validated_data.get('name')
        if validated_data.get('parent_id'):
            category.parent_id = validated_data.get('parent_id')
        category.date_modified = datetime.now()

        category.save()
        return category

    class Meta:
        model = Category
        fields = ('id', 'name', 'parent_id', 'owner', 'date_added', 'date_modified')
