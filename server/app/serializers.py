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
    
    def create(self,validated_data):        
        profile_data = validated_data.pop('profile')
        profile = ProfileSerializer.create(ProfileSerializer(), validated_data=profile_data)
        
        user, created = User.objects.update_or_create(profile = profile,
                                                        username=validated_data['username'],
                                                        email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user

class RetriewCreateDestroyUserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    class Meta:
        model = User
        fields = ['username','email','profile']
    
    def update(self, instance, validated_data):
        print(validated_data)
        profile_data = validated_data.pop('profile')
        profile = instance.profile
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        profile.name = profile_data.get('name', profile.name)
        profile.second_name = profile_data.get('second_name', profile.second_name)
        profile.description = profile_data.get('description', profile.description)
        profile.company = profile_data.get('company', profile.company)
        profile.phone_number = profile_data.get('phone_number', profile.phone_number)
        
        profile.save()
        return instance


class ProfileViewSerializer(serializers.ModelSerializer):
    user = UserSerializer(many = False)
    class Meta:
        model = Profile
        fields = ['user','name','second_name','description','company','phone_number','rating','is_admin','created_date']