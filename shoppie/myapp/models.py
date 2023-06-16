from django.db import models

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
    rating = models.IntegerField(default=0)
    content = models.CharField(max_length=50)
    id = models.AutoField( primary_key=True)
    createdAt = models.DateField()

class ShoppieUser(models.Model):
    userid=models.AutoField(primary_key=True)
    username=models.CharField(max_length=255)
    password=models.CharField(max_length=255)
    role=models.CharField(max_length=255)