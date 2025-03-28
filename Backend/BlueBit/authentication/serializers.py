from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import User

class UserSerializer(DocumentSerializer):  # Use MongoEngine serializer
    class Meta:
        model = User
        fields = '__all__'  # Ensure all fields are serialized properly
