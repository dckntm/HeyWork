from django.db import models
import datetime
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="profile")
    name = models.CharField(max_length=15)
    second_name = models.CharField(max_length=15)
    description = models.TextField(null=True)
    rating = models.FloatField(null=True)
    company = models.TextField()
    phone_number = models.CharField(max_length=15) 
    is_admin = models.BooleanField(default=False)  
    created_date = models.DateField(default=datetime.date.today)

    def __str__(self):
        return self.user.username

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.TextField()
    description = models.TextField(null=True)
    rating = models.FloatField(null=True)
    review = models.TextField(null=True)

class Users_Order(models.Model):
    customer_id = models.ForeignKey(User,on_delete = models.CASCADE, related_name='customer')
    executor_id = models.ForeignKey(User,on_delete = models.CASCADE, related_name='executor')
    order_id = models.ForeignKey(Order,on_delete = models.CASCADE)

class Status(models.Model):
    id = models.OneToOneField(Order,on_delete = models.CASCADE,primary_key=True)
    name = models.TextField()


class Technology(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField()

class Stack_to_User(models.Model):
    user_id = models.ForeignKey(User,on_delete = models.CASCADE)
    technology_id = models.ForeignKey(Technology,on_delete = models.CASCADE)


class Stack_to_Order(models.Model):
    order_id = models.ForeignKey(Order,on_delete = models.CASCADE)
    technology_id = models.ForeignKey(Technology,on_delete = models.CASCADE)