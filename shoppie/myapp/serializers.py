from rest_framework import serializers
from myapp.models import ShoppieUser, Product, Order, Review

class ShoppieUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=ShoppieUser
        fields='__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fiels='__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'