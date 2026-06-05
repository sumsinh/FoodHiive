from rest_framework import serializers
from .models import Order, OrderItem
from foods.models import Food
from foods.serializers import FoodSerializer


class OrderItemSerializer(serializers.ModelSerializer):

    food = FoodSerializer(read_only=True)

    food_id = serializers.PrimaryKeyRelatedField(
        queryset=Food.objects.all(),
        source="food",
        write_only=True
    )

    class Meta:
        model = OrderItem
        exclude = ["order"]


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        exclude = ["user"]

    def create(self, validated_data):

        items_data = validated_data.pop("items")

        validated_data.pop("user", None)

        user = self.context["request"].user

        order = Order.objects.create(
            user=user,
            **validated_data
        )

        for item in items_data:

            OrderItem.objects.create(
    order=order,
    food_name=item["food"].name,
    quantity=item["quantity"],
    price=item["price"]
)

        return order
    
class AdminOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = "__all__"