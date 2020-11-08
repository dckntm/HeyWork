  
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import *
from django.conf.urls import url

urlpatterns = [
    url(r'^create/$', CreateUserAPIView.as_view()),
]