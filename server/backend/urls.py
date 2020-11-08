from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from django.urls.resolvers import URLPattern
from django.conf.urls import url

urlpatterns = [
 url(r'^admin/', admin.site.urls),
url(r'^user/', include('app.urls')),
]
