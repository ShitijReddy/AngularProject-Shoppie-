from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.contrib.auth.models import Group as AuthGroup


class Product(models.Model):
    prodName = models.CharField(max_length=100)
    prodDesc = models.TextField()
    image = models.URLField()
    sideImg = models.URLField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quant = models.PositiveIntegerField()
    id = models.CharField(max_length=20, unique=True, primary_key=True)
    category = models.CharField(max_length=50)
    custName = models.CharField(max_length=100)
    vendorName = models.CharField(max_length=100)

    def __str__(self):
        return self.prodName

class Order(models.Model):
    prodName = models.CharField(max_length=100)
    prodDesc = models.TextField()
    image = models.URLField()
    sideImg = models.URLField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quant = models.PositiveIntegerField()
    id = models.CharField(max_length=20, unique=True, primary_key=True)
    category = models.CharField(max_length=50)
    custName = models.CharField(max_length=100)
    vendorName = models.CharField(max_length=100)

    def __str__(self):
        return self.prodName

class Review(models.Model):
    product_title = models.CharField(max_length=100,null=True) 
    author = models.CharField(max_length=255, null=True)
    rating = models.IntegerField(default=0)
    comment = models.TextField(default="good")
    # created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review by {self.author}'

class ShoppieUser(models.Model):
    userid=models.AutoField(primary_key=True)
    username=models.CharField(max_length=255, unique=True)
    password=models.CharField(max_length=255)
    role=models.CharField(max_length=255)
    def __str__(self):
        return self.username

class Group(AuthGroup):
    users = models.ManyToManyField(
        ShoppieUser,
        related_name='my_groups',  # Provide a related name for the reverse accessor
        blank=True,
        verbose_name='users',
        help_text='The users belonging to this group.'
    )
