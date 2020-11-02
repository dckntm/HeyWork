from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

class CreateUser(generics.CreateAPIView):
    serializer_class = UserSerializer

class GetAllUsers(generics.ListAPIView):
    serializer_class = UserListSerializer
    queryset = User.objects.all()

class PutGetDeleteOneUser(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


def CreateUserAPIView(user,request):
    user = request.data
    serializer = UserSerializer(data=user)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data,status=status.HTTP_201_CREATED)