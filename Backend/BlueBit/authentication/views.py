from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import auth
from .models import User
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user):
    """Generate JWT tokens (access & refresh) for the user."""
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }

@api_view(["POST"])
def firebase_auth(request):
    try:
        token = request.data.get("idToken")
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token["uid"]
        email = decoded_token.get("email")
        name = decoded_token.get("name", "")

        # Check if user exists
        user = User.objects.filter(email=email).first()

        if user:
            if not user.firebase_uid:
                user.firebase_uid = uid
                user.save()
            message = "User authenticated"
        else:
            user = User.objects.create(firebase_uid=uid, email=email, name=name)
            message = "New user created"

        # Generate JWT token
        tokens = get_tokens_for_user(user)

        serializer = UserSerializer(user)
        return Response(
            {
                "message": message,
                "user": serializer.data,
                "tokens": tokens,  # Send JWT tokens to frontend
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
