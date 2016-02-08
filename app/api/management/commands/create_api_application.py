from django.core.management.base import BaseCommand

from app.users.serializers import UserSerializer
from oauth2_provider.admin import Application


class Command(BaseCommand):
    def handle(self, *args, **options):
        app = Application(
            name='Auth',
            client_id='RBPoX0l6x2D2kuhe3UCrU1pNrCLaKdgME2ce2I3T',
            client_secret='oabAcDqFoGCRUyH4YEbLCAugrjznSFd4OUHKLAsNkGxPOAAU9tJjwp6SF1KGW9T7QKzFwjZyxUrjidbht9gXwgvr7kDLBXVjiAHGFvYQ0B3iCHTPYcp4qZ9NZNEtdJZW',
            user_id=1,
            client_type='confidential',
            authorization_grant_type='password'
        )
        app.save()
