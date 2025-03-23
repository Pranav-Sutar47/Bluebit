from django.urls import path
from .views import firebase_auth
from .views import update_medical_details
from .views import get_user_details
from .views import create_meeting

urlpatterns = [
    path("login/", firebase_auth, name="login"),
    path("update-medical-details/", update_medical_details, name="update-medical-details"),
    path('get-user-details/', get_user_details, name='get-user-details'),
    path('create-meeting/', create_meeting, name='create-meeting')
]