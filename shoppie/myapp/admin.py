from django.contrib import admin

from .models import Product, Order, Review,ShoppieUser
# Register your models here.
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(ShoppieUser)
admin.site.register(Review)
