from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['is_staff'] = user.is_staff
        return token

# region Stack


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['id','name']


class UserTechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['id']


class ListTechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['id', 'name']

# endregion

# region User


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['description', 'avatar', 'company', 'phone_number']


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    technology = TechnologySerializer(many=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name',
                  'last_name', 'password', 'profile', 'technology']
        extra_kwargs = {'password': {'write_only': True}}


class RetriewUpdateDestroyUserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    technology = TechnologySerializer(many=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name',
                  'last_name', 'profile', 'technology']


class UserListSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    technology = TechnologySerializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name',
                  'last_name', 'profile', 'technology']

# endregion

# region Order


class UserOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']

class ListOpenedOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'title', 'description', 'deadline']

# Открытый заказчиком заказ
class OpenedOrderSerializer(serializers.ModelSerializer):
    customer = UserOrderSerializer(many=False)
    executor = UserOrderSerializer(many=False)

    class Meta:
        model = Order
        fields = ['customer', 'executor', 'title', 'description', 'deadline']

# Ожидающий подтверждения о закрытии исполнителем заказ
class ExpectsOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['title', 'description', 'deadline', 'rating', 'review']
        extra_kwargs = {'title': {'read_only': True},
                        'description': {'read_only': True},
                        'deadline': {'read_only': True}}

# Возвращенный исполнителем заказ
class ReturnedOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['title', 'description', 'deadline',
                  'review', 'rating', 'review', 'comment']
        extra_kwargs = {'title': {'read_only': True},
                        'description': {'read_only': True},
                        'deadline': {'read_only': True}}


# Закрытый заказ
class ClosedOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['title', 'description', 'deadline', 'rating', 'review']
        extra_kwargs = {'title': {'read_only': True},
                        'description': {'read_only': True},
                        'deadline': {'read_only': True}}

# endregion
