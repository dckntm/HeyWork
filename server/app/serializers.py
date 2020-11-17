import djoser
from rest_framework import serializers, generics
from rest_framework.permissions import IsAuthenticated
from .models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','password']
        extra_kwargs = {'password' : {'write_only' : True}}

class CreateProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many = False)
    class Meta:
        model = Profile
        fields = ['user','name','second_name','description','company','phone_number']

    def create(self,validated_data):
        user_data = validated_data.pop('user')
        password = user_data.pop('password')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        user.set_password(password)
        user.save()
        profile, created = Profile.objects.update_or_create(user=user,
                            name=validated_data.pop('name'),
                            second_name=validated_data.pop('second_name'),
                            description=validated_data.pop('description'),
                            company=validated_data.pop('company'),
                            phone_number=validated_data.pop('phone_number'))
        return profile