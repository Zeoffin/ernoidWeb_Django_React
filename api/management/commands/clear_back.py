from django.core.management.base import BaseCommand, CommandError
from api.models import Clothing


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def handle(self, *args, **options):

        all_items = Clothing.objects.all()

        for item in all_items:
            item.preview_image_back = None
            item.save()

        self.stdout.write(self.style.SUCCESS('Done'))
        print('Done')
