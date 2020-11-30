from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from rest_framework_simplejwt import views




urlpatterns = [
    path('admin/', admin.site.urls),
	#path to djoser end points
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
	#path to our account's app endpoints
    path("api/app/",include("app.urls"))
]
