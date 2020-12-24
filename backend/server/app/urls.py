from django.urls import path
from .views import *

urlpatterns = [
    path('auth/jwt/create', MyTokenObtainPairView.as_view()),
    path("user/<int:pk>", RetriewUpdateDestroyUser.as_view()),
    path("user/create", UserCreateView.as_view()),
    path("users", get_users),

    path("stack/create", CreateTechnology.as_view()),
    path("stack/<int:pk>", RetriewUpdateDestroyTechnology.as_view()),
    path("stack", GetTechnologyList.as_view()),
    
    path("order/create", CreateOrder.as_view()),
    path("order/close/<int:pk>", CloseOrder.as_view()),
    path("order/return/<int:pk>", ReturnOrder.as_view()),
    path("customer/returned_orders/<int:pk>",get_customer_returned_orders),
    path("returned_orders/", get_returned_orders),
    path("customerOrders/<int:pk>", get_customer_orders),
    path("executorOrders/<int:pk>", get_executor_orders),
    
    path("search/", search),
    path("media/<str:path_to_avatar>", get_avatar)
]
