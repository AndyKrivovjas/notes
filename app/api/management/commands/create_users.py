from django.core.management.base import BaseCommand

from app.users.serializers import UserSerializer


class Command(BaseCommand):
    def handle(self, *args, **options):
        users = [
            {'username': 'andy', 'email': 'andy.krivovjas@gmail.com', 'first_name': 'Andy', 'last_name': 'Krivovjas', 'password': 'password_web', 'is_superuser': True}
        ]
        for item in users:
            user = UserSerializer.register(item)
            if item.get('is_superuser'):
                user.is_superuser = True
                user.is_staff = True
                user.is_admin = True
                user.save()
