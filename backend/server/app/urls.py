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
    path("order/close_by_customer/<int:pk>", ClosingOrderByCustomer.as_view()),
    path("order/close_by_executor/<int:pk>/<int:user_pk>", ClosingOrderByExecutor.as_view()),
    path("order/cancel_refund/<int:pk>",CancelOrderReturn.as_view()),
    path("order/to_admin_review/<int:pk>",SendForConsiderationOrderToAdmin.as_view()),
    path("order/return/<int:pk>", ReturnOrder.as_view()),
    path("order/fix/<int:pk>",FixOrderDetails.as_view()),

    path("customer_orders/<int:pk>", get_opened_customer_orders),
    path("customer/returned_orders/<int:pk>",get_customer_returned_orders),
    path("customer/closed_orders/<int:pk>",get_closed_customer_orders),
    path("executor/closed_orders/<int:pk>",get_closed_executor_orders),
    path("executor/opened/<int:pk>",get_opened_executor_orders),
    path("executor/expects/<int:pk>",get_expects_executor_orders),

    path("returned_orders/",get_returned_orders),
    path("exected_order/<int:pk>", get_exects_orders),

    path("search/", search),
    path("media/<str:path_to_avatar>", get_avatar),
    path("avatar/save/<int:pk>",save_avatar)
]
