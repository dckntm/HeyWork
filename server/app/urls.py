  
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import *
from django.conf.urls import url

urlpatterns = [
    path("all-profiles",ProfileListCreateView.as_view(),name="all-profiles"),
   # retrieves profile details of the currently logged in user
    path("profile/<int:pk>",ProfileDetailView.as_view(),name="profile"),
]