from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "firebase_uid", "email", "name", "current_disease", "past_disease", "allergy_information", "surgical_procedure"]