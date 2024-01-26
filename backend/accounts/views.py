from rest_framework import generics
# from django.shortcuts import get_object_or_404
from accounts.serializers import MyTokenObtainPairSerializer, UserSerializer, RegistrationSerializer, UserSerializerWithToken
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import User
# from rest_framework.decorators import permission_classes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class GetUserProfile(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user
    
class UpdateUserProfile(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializerWithToken
    def get_object(self):
        return self.request.user
    def perform_update(self, serializer):
        print(self.request.data)
        serializer.save()
        password = self.request.data.get('password')
        if password:
            user = self.get_object()
            user.set_password(password)
            user.save()
class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializedData = serializer.save(serializer.validated_data)
        
        data = {
            'response': 'Successfully registered',
            'username': serializedData['username'],
            'email': serializedData['email'],
            'token': serializedData.get('token'),
            'tokens': serializedData.get('tokens')
        }
        return Response(data)
class GetAllUsers(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer