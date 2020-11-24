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

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['name']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    class Meta:
        model = User
        fields = ['username','email','first_name','last_name','password','profile','technology']
        extra_kwargs = {'password' : {'write_only' : True}}


class RetriewUpdateDestroyUserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    class Meta:
        model = User
        fields = ['username','email','first_name','last_name','profile',]

class UserListSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    technology = TechnologySerializer(many=True)
    class Meta:
        model = User
        fields = ['username','email','first_name','last_name','profile','technology']

class OpenedOrderSerializer(serializers.ModelSerializer):
    customer = UserSerializer(many=False)
    executor = UserSerializer(many=False)

    class Meta:
        model = Order
        fields = ['title','description','review','deadline']

class ReturnedOrderSerializer(serializers.ModelSerializer):
    customer = UserSerializer(many=False)
    executor = UserSerializer(many=False)
    class Meta:
        model = Order
        fields = ['title','description','review','deadline','rating','review','comment']
        
class ClosedOrderSerializer(serializers.ModelSerializer):
    customer = UserSerializer(many=False)
    executor = UserSerializer(many=False)
    class Meta:
        model = Order
        fields = ['title','description','review','deadline','rating','review']