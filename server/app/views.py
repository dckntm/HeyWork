from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.decorators import api_view


class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer

class RetriewCreateDestroyUser(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RetriewCreateDestroyUserSerializer
    queryset = User.objects.all()


# class ProfileListCreateView(generics.ListCreateAPIView):
#     queryset = Profile.objects.all()
#     serializer_class = CreateProfileSerializer
#     permission_classes = [IsAuthenticated]
    
#     def perform_create(self,serializer):
#         user = self.request.user

