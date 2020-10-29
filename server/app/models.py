from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=15)
    second_name = models.CharField(max_length=15)
    email = models.EmailField(max_length=30,unique=True)
    password = models.CharField(max_length=20)
    description = models.TextField(null=True)
    rating = models.FloatField(null=True)
    company = models.TextField()
    phone_number = models.CharField(max_length=15)
    role_id = models.ForeignKey('Role',on_delete=models.CASCADE)    

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


class Role(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=15)

class Technology(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField()

class Stack_to_User(models.Model):
    user_id = models.ForeignKey(User,on_delete = models.CASCADE)
    technology_id = models.ForeignKey(Technology,on_delete = models.CASCADE)


class Stack_to_Order(models.Model):
    order_id = models.ForeignKey(Order,on_delete = models.CASCADE)
    technology_id = models.ForeignKey(Technology,on_delete = models.CASCADE)