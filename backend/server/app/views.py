from django.http.response import HttpResponse
from rest_framework.response import Response
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#region User
class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        user = User.objects.create(username=request.data['username'],
                                   email=request.data['email'],
                                   password=request.data['password'],
                                   first_name=request.data['first_name'],
                                   last_name=request.data['last_name'],
                                   is_staff=False)
        user.set_password(request.data['password'])

        profile = Profile.objects.create(user=user,
                                         avatar='default_avatar.jpg',
                                         description=request.data['profile']['description'],
                                         company=request.data['profile']['company'],
                                         phone_number=request.data['profile']['phone_number'])

        for i in request.data['technology']:
            user.technology.add(i)

        user.save()

        return Response(status=status.HTTP_201_CREATED)


class RetriewUpdateDestroyUser(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RetriewUpdateDestroyUserSerializer
    queryset = User.objects.all()

    def put(self, request, pk):
        user = self.get_object()
        user.username = request.data['username']
        user.email = request.data['email']
        user.first_name = request.data['first_name']
        user.last_name = request.data['last_name']

        profile = Profile.objects.get(user=user)
        profile.avatar = request.data['profile']['avatar']
        profile.description = request.data['profile']['description']
        profile.company = request.data['profile']['company']
        profile.phone_number = request.data['profile']['phone_number']

        technology = Technology.objects.get(user=user)
        technology.name = request.data['technology']['name']

        user.save()
        profile.save()
        technology.save()
        return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def get_avatar(request, path_to_avatar):
    with open('server/media/' + request.GET.get('path_to_avatar', 'default_avatar.jpg'), "rb") as image:
        avatar = image.read()
        return HttpResponse(avatar,content_type="image/png")

@api_view(['GET'])
def get_users(request):
    users = User.objects.filter(is_staff=False)
    serializer = UserListSerializer(users, many=True)
    return Response(data=serializer.data)

#endregion

#region Stack
class CreateTechnology(generics.CreateAPIView):
    serializer_class = TechnologySerializer


class RetriewUpdateDestroyTechnology(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TechnologySerializer
    queryset = Technology.objects.all()


class GetTechnologyList(generics.ListAPIView):
    serializer_class = ListTechnologySerializer
    queryset = Technology.objects.all()

#endregion

#region Orders

#Открытие заказа исполнителем
class CreateOrder(generics.CreateAPIView):
    serializer_class = OpenedOrderSerializer

    def post(self, request):
        order = Order.objects.create(title=request.data['title'],
                                     description=request.data['description'],
                                     deadline=request.data['deadline'])

        user_order = User_to_Order.objects.create(customer_id=request.data['customer']['id'],
                                                  executor_id=request.data['executor']['id'], order_id=order.id)
        return Response(status=status.HTTP_201_CREATED)

#Закрытие заказчиком заказа
class ClosingOrderByCustomer(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClosedOrderSerializer
    queryset = Order.objects.all()

    def put(self, request, pk):
        order = self.get_object()

        order.review = request.data['review']
        order.rating = request.data['rating']
        order.status = 3
        order.comment = None
        order.save()
        return Response(status=status.HTTP_200_OK)

#Подтвердить исполнителем закрытие заказа
class CloseOrderByExecutor(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClosedOrderSerializer
    queryset = Order.objects.all()

    def put(self, request, pk):
        order = self.get_object()

        order.status = 2
        order.comment = None
        order.save()
        return Response(status=status.HTTP_200_OK)

#Отправление заказа администратором заказчику 
class ReturnOrder(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReturnedOrderSerializer
    queryset = Order.objects.all()

    def put(self, request, pk):
        order = self.get_object()

        order.comment = request.data['comment']
        order.save()
        return Response(status=status.HTTP_200_OK)

# Отменить возврат заказа на редактирование
class CancelOrderReturn(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClosedOrderSerializer
    queryset = Order.objects.all()

    def put(self, request, pk):
        order = self.get_object()
        order.status = 2
        order.save()
        return Response(status=status.HTTP_200_OK)

#Исправление заказа заказчиком
class FixOrderDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReturnedOrderSerializer
    queryset = Order.objects.all()

    def put(self, request, pk):
        order = self.get_object()

        order.review = request.data['review']
        order.rating = request.data['rating']
        order.status = 3
        
        order.save()
        return Response(status=status.HTTP_200_OK)

#endregion

#region Get user orders

# Список всех открытых заказчиком заказов
@api_view(['GET'])
def get_opened_customer_orders(request, pk):
    orders = Order.objects.filter(user_to_order__customer=pk, status=0)
    serializer = OpenedOrderSerializer(orders, many=True)
    return Response(data=serializer.data)

# Список всех возвращенных на дороботку заказчику заказов
@api_view(['GET'])
def get_customer_returned_orders(request, pk):
    returned_orders = Order.objects.filter(user_to_order__customer=pk, status=2)
    serializer = ReturnedOrderSerializer(returned_orders, many=True)
    return Response(data=serializer.data)


# Список закрытых заказов для заказчика
@api_view(['GET'])
def get_closed_customer_orders(request, pk):
    orders = Order.objects.filter(user_to_order__customer=pk, status=2)
    serializer = ClosedOrderSerializer(orders, many=True)
    return Response(data=serializer.data)

# Список выполненных исполнителем заказов
@api_view(['GET'])
def get_closed_executor_orders(request, pk):
    orders = Order.objects.filter(user_to_order__executor=pk, status=2)
    serializer = ClosedOrderSerializer(orders, many=True)
    return Response(data=serializer.data)

# Список открытых исполнителю заказов
@api_view(['GET'])
def get_opened_executor_orders(request, pk):
    orders = Order.objects.filter(user_to_order__executorr=pk, status=0)
    serializer = ClosedOrderSerializer(orders, many=True)
    return Response(data=serializer.data)

# Список заказов ожидающих подтверждения закрытия у исполнителя 
@api_view(['GET'])
def get_expects_executor_orders(request, pk):
    orders = Order.objects.filter(user_to_order__executor=pk, status=3)
    serializer = ClosedOrderSerializer(orders, many=True)
    return Response(data=serializer.data)

# Список всех возвращенных заказов
@api_view(['GET'])
def get_returned_orders(request):
    orders = Order.objects.filter(status=2)
    serializer = ReturnedOrderSerializer(orders, many=True)
    return Response(data=serializer.data)

#endregion

@api_view(['GET'])
def search(request):
    tech = request.GET.get("tech", None)
    first_name = request.GET.get("first_name", None)
    last_name = request.GET.get("last_name", None)
    if not tech is None:
        users = User.objects.filter(technology__id=tech)
        serializer = UserListSerializer(users, many=True)
        return Response(data=serializer.data)
    elif not first_name is None:
        users = User.objects.filter(first_name=first_name, last_name=last_name)
        serializer = UserListSerializer(users, many=True)
        return Response(data=serializer.data)



