from rest_framework.fields import Field, CharField
from .models import User
from rest_framework import serializers
from app.tag.serializers import TagSerializer


class UserSerializer(serializers.ModelSerializer):

    display_name = CharField(source='first_name') if CharField(source='first_name') else CharField(source='username')

    def __init__(self, *args, **kwargs):
        super(serializers.ModelSerializer, self).__init__(*args, **kwargs)

    @staticmethod
    def register(validated_data):
        user = User(email=validated_data['email'], username=validated_data['username'])
        if validated_data.get('first_name'):
            user.first_name = validated_data.get('first_name')
        if validated_data.get('last_name'):
            user.last_name = validated_data.get('last_name')
        user.set_password(validated_data['password'])
        user.save()

        # Creating default tags
        TagSerializer.add_defaults(user)

        return user

    @staticmethod
    def update(user, validated_data):
        if validated_data.get('first_name'):
            user.first_name = validated_data.get('first_name')
        if validated_data.get('last_name'):
            user.last_name = validated_data.get('last_name')
        if validated_data.get('email'):
            user.email = validated_data.get('email')

        user.save(force_update=True)
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'display_name')


class UserScopeSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super(serializers.ModelSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = User
        fields = ('scope',)
