  
from django.urls import path
from .views import *
from django.conf.urls import url

urlpatterns = [
    path('auth/jwt/create', MyTokenObtainPairView.as_view()),
    path("user/<int:pk>",RetriewUpdateDestroyUser.as_view()),
    path("user/create",UserCreateView.as_view()),
    path("users",GetUsers.as_view()),
    path("stack/create",CreateTechnology.as_view()),
    path("stack/<int:pk>",RetriewUpdateDestroyTechnology.as_view()),
    path("stack",GetListTechnology.as_view()),
    path("order/create",CreateOrder.as_view()),
    path("order/close/<int:pk>",CloseOrder.as_view()),
    path("order/return/<int:pk>",ReturnOrder.as_view()),
    path("returned_orders/",get_returned_orders),
    path("customerOrders/<int:pk>",get_customer_orders),
    path("executorOrders/<int:pk>",get_executor_orders),
    path("search/",search)
]