from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework import generics
from rest_framework.status import HTTP_201_CREATED
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.decorators import api_view


class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def post(self,request):
        user = User.objects.create(username= request.data['username'],
                                    email = request.data['email'],
                                    password = request.data['password'])
        user.set_password(request.data['password'])
        user.save()

        profile = Profile.objects.create(user=user,
                                        name = request.data['profile.name'],
                                        second_name = request.data['profile.second_name'],
                                        description = request.data['profile.description'],
                                        company = request.data['profile.company'],
                                        phone_number = request.data['profile.phone_number'])
        return Response(status = status.HTTP_201_CREATED)


class RetriewCreateDestroyUser(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RetriewCreateDestroyUserSerializer
    queryset = User.objects.all()

    def put(self,request,pk):
        user = self.get_object()
        user.username = request.data['username']
        user.email = request.data['email']

        profile = Profile.objects.get(user=user)
        profile.name = request.data['profile.name']
        profile.second_name = request.data['profile.second_name']
        profile.description = request.data['profile.description']
        profile.company = request.data['profile.company']
        profile.phone_number = request.data['profile.phone_number']

        user.save()
        profile.save()
        return Response(status = status.HTTP_200_OK)


