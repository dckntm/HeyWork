from rest_framework.response import Response 
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework import status

class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def post(self,request):
        user = User.objects.create(username= request.data['username'],
                                    email = request.data['email'],
                                    password = request.data['password'],
                                    first_name = request.data['first_name'],
                                    last_name = request.data['last_name'],
                                    is_staff = False)
        user.set_password(request.data['password'])

        profile = Profile.objects.create(user=user,
                                        avatar = request.data['profile.avatar'],
                                        description = request.data['profile.description'],
                                        company = request.data['profile.company'],
                                        phone_number = request.data['profile.phone_number'])

        user.technology.add(request.data['technology'])
        user.save()

        return Response(status = status.HTTP_201_CREATED)

class RetriewUpdateDestroyUser(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RetriewUpdateDestroyUserSerializer
    queryset = User.objects.all()

    def put(self,request,pk):
        user = self.get_object()
        user.username = request.data['username']
        user.email = request.data['email']
        user.first_name = request.data['first_name']
        user.last_name = request.data['last_name']


        profile = Profile.objects.get(user=user)
        profile.avatar = request.data['profile.avatar']
        profile.description = request.data['profile.description']
        profile.company = request.data['profile.company']
        profile.phone_number = request.data['profile.phone_number']

        technology = Technology.objects.get(user=user)
        technology.name = request.data['technology.name']


        user.save()
        profile.save()
        technology.save()
        return Response(status = status.HTTP_200_OK)

class GetUsers(generics.ListAPIView):
    serializer_class = UserListSerializer
    queryset = User.objects.all()

class CreateTechnology(generics.CreateAPIView):
    serializer_class = TechnologySerializer

class RetriewUpdateDestroyTechnology(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TechnologySerializer
    queryset = Technology.objects.all()

class GetListTechnology(generics.ListAPIView):
    serializer_class = TechnologySerializer
    queryset = Technology.objects.all()