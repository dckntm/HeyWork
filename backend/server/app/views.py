from django.http.response import HttpResponse
from rest_framework.response import Response
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.files.storage import FileSystemStorage

# изменение рейтинга
def change_user_rating(user_pk):
    profile = Profile.objects.get(user=user_pk)

    rating = list(Order.objects.filter(executor=user_pk,status=2).values_list('rating'))
    rating = [i[0] for i in rating]
    if len(rating) != 0:  
        profile.rating = round(sum(rating)/len(rating))
        
    profile.save()

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
        # profile.avatar = request.data['profile']['avatar']
        profile.description = request.data['profile']['description']
        profile.company = request.data['profile']['company']
        profile.phone_number = request.data['profile']['phone_number']
        # print(request.data['technology'])
        for i in request.data['technology']:
            user.technology.add(i)

        user.save()
        profile.save()
        return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def get_users(request):
    users = User.objects.filter(is_staff=False)
    serializer = UserListSerializer(users, many=True)
    return Response(data=serializer.data)

from PIL import Image
@api_view(['GET'])
def get_avatar(request, path_to_avatar):
    fs = FileSystemStorage(location='server/media/')
    return HttpResponse(fs.open(path_to_avatar,mode='rb'),content_type="image/png")



@api_view(['POST'])
def save_avatar(request,pk):
    profile = Profile.objects.get(user=pk)
    if 'avatar' in request.FILES:
        avatar = request.FILES['avatar']
    else:
        return Response(data={"error":"no avatar parameter or no file in request"}, status=status.HTTP_400_BAD_REQUEST)
    
    avatar_name = request.FILES['avatar'].name
    fs = FileSystemStorage(location='server/media/')
    fs.save(avatar_name,avatar)
    
    profile.avatar = avatar_name
    profile.save()
    return HttpResponse(status=status.HTTP_200_OK)

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
        customer = User.objects.get(id=request.data['customer'])
        executor = User.objects.get(id=request.data['executor'])

        order = Order.objects.create(customer=customer,
                                     executor=executor,
                                     title=request.data['title'],
                                     description=request.data['description'],
                                     deadline=request.data['deadline'])
        return Response(status=status.HTTP_201_CREATED)

# Закрытие заказчиком заказа
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

# Подтвердить исполнителем закрытие заказа
class ClosingOrderByExecutor(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClosedOrderSerializer
    queryset = Order.objects.all()

    def put(self, request, pk,user_pk):
        order = self.get_object()

        order.status = 2
        order.comment = None
        order.save()

        change_user_rating(user_pk)

        return Response(status=status.HTTP_200_OK)

# Отправить исполнителем заказ на рассмотрение администратора
class SendForConsiderationOrderToAdmin(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClosedOrderSerializer
    queryset = Order.objects.all()

    def put(self, request, pk):
        order = self.get_object()

        order.status = 1
        order.save()
        return Response(status=status.HTTP_200_OK)

# Отправление заказа администратором заказчику 
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
        order.comment = None
        order.save()
        return Response(status=status.HTTP_200_OK)

#endregion

#region Get user orders

# Список всех открытых заказчиком заказов
@api_view(['GET'])
def get_opened_customer_orders(request, pk):
    orders = Order.objects.filter(customer=pk, status=0)
    serializer = ListOpenedOrderSerializer(orders, many=True)
    return Response(data=serializer.data)

# Список всех возвращенных на дороботку заказчику заказов
@api_view(['GET'])
def get_customer_returned_orders(request, pk):
    returned_orders = Order.objects.filter(customer=pk, status=1)
    serializer = ReturnedOrderSerializer(returned_orders, many=True)
    return Response(data=serializer.data)


# Список закрытых заказов для заказчика
@api_view(['GET'])
def get_closed_customer_orders(request, pk):
    orders = Order.objects.filter(customer=pk, status=2)
    serializer = ClosedOrderSerializer(orders, many=True)
    return Response(data=serializer.data)

# Список выполненных исполнителем заказов
@api_view(['GET'])
def get_closed_executor_orders(request, pk):
    orders = Order.objects.filter(executor=pk, status=2)
    serializer = ClosedOrderSerializer(orders, many=True)
    return Response(data=serializer.data)

# Список открытых исполнителю заказов
@api_view(['GET'])
def get_opened_executor_orders(request, pk):
    orders = Order.objects.filter(executor=pk, status=0)
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
    orders = Order.objects.filter(status=1)
    print(orders)
    serializer = ListReturnedOrderSerializer(orders, many=True)
    return Response(data=serializer.data)


@api_view(['GET'])
def get_exects_orders(request,pk):
    orders = Order.objects.filter(executor=pk, status=3)
    serializer = ListClosedOrderSerializer(orders, many=True)
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
