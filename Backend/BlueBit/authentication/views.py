from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import auth
from .serializers import UserSerializer

User = get_user_model()

@api_view(["POST"])
def firebase_auth(request):
    try:
        token = request.data.get("idToken")
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token["uid"]
        email = decoded_token.get("email")
        name = decoded_token.get("name", "")

        user, created = User.objects.get_or_create(firebase_uid=uid, defaults={"email": email, "name": name})

        serializer = UserSerializer(user)
        return Response({"message": "User authenticated", "user": serializer.data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
