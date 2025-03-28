from django.core.management.base import BaseCommand
from pymongo import ASCENDING
from authentication.mongo_utils import get_mongo_db

class Command(BaseCommand):
    help = 'Creates MongoDB indexes'

    def handle(self, *args, **options):
        db = get_mongo_db()
        db.users.create_index([("email", ASCENDING)], unique=True)
        db.users.create_index([("firebase_uid", ASCENDING)], unique=True)
        self.stdout.write(self.style.SUCCESS('Successfully created indexes'))