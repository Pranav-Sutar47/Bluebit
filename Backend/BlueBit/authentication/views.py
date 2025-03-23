from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import auth
from .models import User
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import time


def get_tokens_for_user(user):
    """Generate JWT tokens (access & refresh) for the user."""
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


#API for user login O-Auth
@api_view(["POST"])
@permission_classes([])
def firebase_auth(request):
    try:
        token = request.data.get("idToken")
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token["uid"]
        email = decoded_token.get("email")
        name = decoded_token.get("name", "")

        # Check if user exists
        user = User.objects.filter(email=email).first()

        print(uid,'\n',email,'\n',name)

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


#API for adding Medical History
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_medical_details(request):
    try:
        user = request.user  # Get authenticated user from the token

        # Extract medical fields from request data
        user.current_disease = request.data.get("current_disease", user.current_disease)
        user.past_disease = request.data.get("past_disease", user.past_disease)
        user.allergy_information = request.data.get("allergy_information", user.allergy_information)
        user.surgical_procedure = request.data.get("surgical_procedure", user.surgical_procedure)

        user.save()  # Save updated details

        return Response(
            {"message": "Medical details updated successfully", "user": UserSerializer(user).data},
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

#API for get User Details
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    try:
        user = request.user  # Get the authenticated user
        serializer = UserSerializer(user)

        return Response(
            {"message": "User details fetched successfully", "user": serializer.data},
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


#API for genrating meetings

DAILY_API_KEY = "7df1dfd0dbe38f769331c076ae441b50df61b69a951de918cad5a069af651eec"

@csrf_exempt
@permission_classes([])
def create_meeting(request):
    url = "https://api.daily.co/v1/rooms"
    headers = {
        "Authorization": f"Bearer {DAILY_API_KEY}",
        "Content-Type": "application/json",
    }
    exp_time = int(time.time()) + 86400  # 24 hours from now

    data = {
        "privacy": "public",  # Anyone with the link can join
        "properties": {
            "exp": exp_time
        }
    }

    response = requests.post(url, json=data, headers=headers)
    room_data = response.json()

    # ✅ Debugging logs
    print("Daily.co API Response:", room_data)

    if response.status_code == 200:
        return JsonResponse({"url": room_data.get("url", "No URL returned")})  # Fix: Ensure "url" is returned
    else:
        return JsonResponse({"error": room_data}, status=response.status_code)