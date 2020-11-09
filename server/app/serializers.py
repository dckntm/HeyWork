from rest_framework import serializers, generics
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerProfileOrReadOnly
from .models import *

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only = True)
    class Meta:
        model = Profile
        fields = '__all__'

class ProfileListCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self,serializer):
        user = self.request.user

class ProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerProfileOrReadOnly,IsAuthenticated]