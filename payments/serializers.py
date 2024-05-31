from rest_framework import serializers
from .models import *


class ProductSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
    description = serializers.CharField()
    # default_price = default_price = serializers.CharField(
    #     allow_null=False, allow_blank=False)
    type = serializers.ChoiceField(choices=["good", "service"])
    created = serializers.IntegerField()
    updated = serializers.IntegerField()
    images = serializers.ListField(child=serializers.URLField())


class PriceSerializer(serializers.Serializer):
    id = serializers.CharField()
    product = serializers.CharField()
    currency = serializers.CharField()
    unit_amount = serializers.IntegerField()
    active = serializers.BooleanField()
    created = serializers.IntegerField()
    metadata = serializers.DictField(child=serializers.CharField())


class ProductPriceSerializer(serializers.Serializer):
    product = ProductSerializer()
    prices = PriceSerializer(many=True)


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['name', 'price_id', 'out_of_stock', 'description']


class OrderItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer()  # Nested serialization of the related Item

    class Meta:
        model = OrderItem
        fields = ['item', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    # Nested serialization of the related OrderItems
    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['order_number', 'status', 'order_items']
