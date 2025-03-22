from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import auth
from .models import User
from .serializers import UserSerializer

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
        message = "User authenticated" if not created else "New user created"

        return Response({"message": message, "user": serializer.data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
