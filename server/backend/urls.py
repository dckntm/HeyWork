from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from django.urls.resolvers import URLPattern
from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token 

urlpatterns = [
    path(r'auth/', obtain_jwt_token),
    path(r'refresh/', refresh_jwt_token),
]
