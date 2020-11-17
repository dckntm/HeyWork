from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework import generics
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework import status

class ProfileCreateView(generics.CreateAPIView):
    serializer_class = CreateProfileSerializer

    def create(self,request):
        serializer = CreateProfileSerializer(data=request.data,many=False)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# class ProfileListCreateView(generics.ListCreateAPIView):
#     queryset = Profile.objects.all()
#     serializer_class = CreateProfileSerializer
#     permission_classes = [IsAuthenticated]
    
#     def perform_create(self,serializer):
#         user = self.request.user

