  
from django.urls import path
from .views import *
from django.conf.urls import url

urlpatterns = [
    path("user/<int:pk>",RetriewUpdateDestroyUser.as_view()),
    path("user/create",UserCreateView.as_view()),
    path("users",GetUsers.as_view()),
    path("stack/create",CreateTechnology.as_view()),
    path("stack/<int:pk>",RetriewUpdateDestroyTechnology.as_view()),
    path("stack",GetListTechnology.as_view()),
    path("order/create",CreateOrder.as_view())
]