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
