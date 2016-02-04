from .models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super(serializers.ModelSerializer, self).__init__(*args, **kwargs)

    @staticmethod
    def register(validated_data):
        user = User(email=validated_data['email'], username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
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
        fields = ('id', 'username', 'first_name', 'last_name', 'email')
