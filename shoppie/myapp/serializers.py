from rest_framework import serializers
from myapp.models import ShoppieUser

class ShoppieUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=ShoppieUser
        fields='__all__'