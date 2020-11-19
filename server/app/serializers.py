import djoser
from rest_framework import serializers, generics
from rest_framework.permissions import IsAuthenticated
from .models import *
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['name','second_name','description','company','phone_number']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    class Meta:
        model = User
        fields = ['username','email','password','profile']
        extra_kwargs = {'password' : {'write_only' : True}}


class RetriewCreateDestroyUserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    class Meta:
        model = User
        fields = ['username','email','profile']

class UserListSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    class Meta:
        model = User
        fields = ['username','email','profile']

