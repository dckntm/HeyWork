  
from django.urls import path
from .views import *
from django.conf.urls import url

urlpatterns = [
    path("user/<int:pk>",RetriewCreateDestroyUser.as_view()),
    path("user/create",UserCreateView.as_view()),
    path("users",GetUsers.as_view())
]