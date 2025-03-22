from django.urls import path
from .views import firebase_auth

urlpatterns = [
    path("login/", firebase_auth, name="login"),
]