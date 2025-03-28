from pymongo import MongoClient
from django.conf import settings

def get_mongo_client():
    return MongoClient(
        host=settings.MONGODB_HOST,
        port=settings.MONGODB_PORT,
        username=settings.MONGODB_USERNAME,
        password=settings.MONGODB_PASSWORD,
        authSource=settings.MONGODB_AUTH_SOURCE,
        tls=settings.MONGODB_USE_TLS
    )

def get_mongo_db():
    return get_mongo_client()[settings.MONGODB_NAME]