from django.core.management.base import BaseCommand
from app.task.models import Color


class Command(BaseCommand):
    def handle(self, *args, **options):
        colors = [
            {'name': 'Air Force blue', 'value': '#5d8aa8'},
            {'name': 'Amaranth', 'value': '#e52b50'},
            {'name': 'Dark cyan', 'value': '#008b8b'},
            {'name': 'Dark electric blue', 'value': '#536878'},
            {'name': 'Dollar bill', 'value': '#85bb65'},
            {'name': 'Flax', 'value': '#eedc82'},
        ]
        for item in colors:
            color = Color(name=item['name'], value=item['value'])
            color.save()
