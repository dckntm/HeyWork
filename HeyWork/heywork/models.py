from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=15)
    second_name = models.CharField(max_length=15)
    email = models.EmailField(max_length=30,unique=True)
    password = models.CharField(max_length=20)
    description = models.TextField()
    rating = models.FloatField()
    company = models.CharField()
    phone_number = PhoneNumberField(null=False, blank=False, unique=True)
    role_id = models.ForeignKey('Role',on_delete=models.CASCADE)    

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField()
    description = models.TextField()
    rating = models.FloatField()

class Users_Order(models.Model):
    customer_id = models.ForeignKey(User,on_delete = models.CASCADE)
    executor_id = models.ForeignKey(User,on_delete = models.CASCADE)
    order_id = models.ForeignKey(Order,on_delete = models.CASCADE)

class Status(models.Model):
    id = models.OneToOneField(Order,on_delete = models.CASCADE,primary_key=True)
    name = models.CharField()


class Role(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=15)

class Technology():
    id = models.ManyToManyField(User,primary_key=True)
    name = models.CharField()

class Stack_to_User(models.Model):
    user_id = models.ForeignKey(User,on_delete = models.CASCADE)
    technology_id = models.ForeignKey(Technology,on_delete = models.CASCADE)


class Stack_to_Order(models.Model):
    order_id = models.ForeignKey(Order,on_delete = models.CASCADE)
    technology_id = models.ForeignKey(Technology,on_delete = models.CASCADE)