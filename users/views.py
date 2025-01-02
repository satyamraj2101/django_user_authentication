# C:\Users\KIIT\OneDrive\Desktop\djangoProject\users\views.py
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, RegisterSerializer, ChangePasswordSerializer
from rest_framework.exceptions import AuthenticationFailed, ValidationError


class RegisterView(APIView):
    permission_classes = [AllowAny]  # Allow any user (authenticated or not) to register

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]  # Allow any user (authenticated or not) to login

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Ensure both username and password are provided
        if not username or not password:
            raise AuthenticationFailed("Username and password are required.")

        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"message": "Login successful.", "token": token.key}, status=status.HTTP_200_OK)
        raise AuthenticationFailed("Invalid credentials.")


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            logout(request)
            return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        # Check if user is authenticated
        if not request.user.is_authenticated:
            return Response({"message": "Unauthorized. Please log in again."}, status=status.HTTP_401_UNAUTHORIZED)

        # Deserialize data
        serializer = ChangePasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Check if the old password is correct
        old_password = serializer.validated_data['old_password']
        if not request.user.check_password(old_password):
            return Response({"old_password": "Wrong password."}, status=status.HTTP_400_BAD_REQUEST)

        # Set the new password
        new_password = serializer.validated_data['new_password']
        request.user.set_password(new_password)
        request.user.save()

        return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)
