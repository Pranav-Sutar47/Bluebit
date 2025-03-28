from django.contrib.auth.backends import BaseBackend
from .models import User

class MongoAuthBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects(email=username).first()  # Use `.first()` to avoid exceptions
            if user and user.check_password(password):
                return user
        except Exception as e:
            return None


    def get_user(self, user_id):
        try:
            return User.objects(id=user_id).first()
        except Exception:
            return None
