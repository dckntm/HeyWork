import re
from django.db import models
import datetime
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="profile")
    description = models.TextField(null=True)
    rating = models.FloatField(default = 0)
    company = models.TextField()
    phone_number = models.CharField(max_length=15)
    avatar = models.ImageField(upload_to='static')

    def __str__(self):
        return self.user.email

class Order(models.Model):
    user = models.ManyToManyField(User,through='User_to_Order',through_fields=('order_id','customer_id',))
    title = models.TextField()
    description = models.TextField(null=True)
    rating = models.FloatField(null=True)
    review = models.TextField(null=True)
    isComplete = models.BooleanField(default=False)
    deadline = models.DateTimeField(null=False, default=datetime.datetime.now)

class User_to_Order(models.Model):
    customer_id = models.ForeignKey(User,on_delete = models.CASCADE, related_name='customer')
    executor_id = models.ForeignKey(User,on_delete = models.CASCADE, related_name='executor')
    order_id = models.ForeignKey(Order,on_delete = models.CASCADE)


class Technology(models.Model):
    user = models.ManyToManyField(User,related_name='technology')
    name = models.TextField(unique=True)
    def __str__(self):
        return self.name
