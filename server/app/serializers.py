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

class UserOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']

class OpenedOrderSerializer(serializers.ModelSerializer):
    customer = UserOrderSerializer(many=False)
    executor = UserOrderSerializer(many=False)

    class Meta:
        model = Order
        fields = ['customer','executor','title','description','deadline']

class ReturnedOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['title','description','review','deadline','rating','review','comment']
        extra_kwargs = {'title' : {'read_only' : True},
                        'description' : {'read_only' : True},
                        'deadline' : {'read_only' : True}}
class ClosedOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['title','description','deadline','rating','review']
        extra_kwargs = {'title' : {'read_only' : True},
                        'description' : {'read_only' : True},
                        'deadline' : {'read_only' : True}}