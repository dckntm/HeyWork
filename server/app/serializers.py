from django.db.models import fields
import djoser
from rest_framework import serializers, generics
from rest_framework.permissions import IsAuthenticated
from .models import *
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['avatar','description','company','phone_number']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    class Meta:
        model = User
        fields = ['username','email','first_name','last_name','password','profile']
        extra_kwargs = {'password' : {'write_only' : True}}


class RetriewUpdateDestroyUserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    class Meta:
        model = User
        fields = ['username','email','first_name','last_name','profile']

class UserListSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    class Meta:
        model = User
        fields = ['username','email','profile','first_name','last_name']

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = '__all__'
