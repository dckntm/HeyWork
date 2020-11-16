from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.views import APIView
from .models import *
from .serializers import *

#class CreateProfile(generics.CreateAPIView):
#   serializer_class = ProfileDetailView
#    def post(self,request):
#        Profile.objects.create()