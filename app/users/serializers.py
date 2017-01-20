from django.core.mail import send_mail
from django.http import request
from django.template.loader import render_to_string
from rest_framework.fields import Field, CharField
from rest_framework.reverse import reverse

from .models import User, RestorePassword
from rest_framework import serializers
from app.tag.serializers import TagSerializer


class UserSerializer(serializers.ModelSerializer):


    def __init__(self, *args, **kwargs):
        super(serializers.ModelSerializer, self).__init__(*args, **kwargs)

    @staticmethod
    def register(validated_data):
        from app.task.serializers import TaskCreateUpdateSerializer

        user = User(email=validated_data['email'], username=validated_data['username'])
        if validated_data.get('first_name'):
            user.first_name = validated_data.get('first_name')
        if validated_data.get('last_name'):
            user.last_name = validated_data.get('last_name')
        user.set_password(validated_data['password'])
        user.save()

        # Creating default tags
        TagSerializer.add_defaults(user)

        # Creating default tasks
        TaskCreateUpdateSerializer.add_defaults(user)

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


class UserSerializerView(serializers.ModelSerializer):

    display_name = CharField(source='first_name') if CharField(source='first_name') else CharField(source='username')

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'display_name')


class UserScopeSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super(serializers.ModelSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = User
        fields = ('scope',)

class UserRestoreSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super(serializers.ModelSerializer, self).__init__(*args, **kwargs)

    @staticmethod
    def sendEmail(userEmail, url):

        hashString = UserRestoreSerializer.genHash(userEmail)
        msg_html = render_to_string('restore_password.html', {'link': url + 'user/restore#' + hashString})
        template_email_text = ''
        return send_mail('Restoring Password', template_email_text, 'customerservice@noty.com',
                         [userEmail], html_message=msg_html, fail_silently=False)

    @staticmethod
    def genHash(userEmail):
        import hashlib
        import time

        entities = RestorePassword.objects.filter(email=userEmail)
        for temp in entities:
            temp.status = 0
            temp.save()

        entity = RestorePassword()
        entity.email = userEmail
        hash = hashlib.md5(userEmail + str(time.time())).hexdigest()
        entity.hash = '#' + hash
        entity.status = 1
        entity.save()

        return hash

    @staticmethod
    def changePassword(password, hash):

        entity = RestorePassword.objects.filter(hash=hash, status=1)[0]
        userEmail = entity.email

        user = User.objects.filter(email=userEmail)[0]
        if entity.status:
            entity.status = 0
            entity.save()
            user.set_password(password)
            user.save()

        return user.username


    class Meta:
        model = RestorePassword
        fields = ('id', 'temp_pass', 'created')
