from django.db import models
from django.contrib.auth.models import User
from delivery.models import DeliveryPartner


class Order(models.Model):

    PAYMENT_CHOICES = (
        ("COD", "Cash on Delivery"),
        ("UPI", "UPI"),
        ("CARD", "Card"),
    )

    STATUS_CHOICES = (
    ("Order Placed", "Order Placed"),
    ("Preparing", "Preparing"),
    ("Out For Delivery", "Out For Delivery"),
    ("Delivered", "Delivered"),
    ("Cancelled", "Cancelled"),
)

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    full_name = models.CharField(max_length=255)

    phone = models.CharField(max_length=20)

    address = models.TextField()

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_CHOICES,
        default="COD"
    )

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
    max_length=30,
    choices=STATUS_CHOICES,
    default="Order Placed"
)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Order #{self.id}"
    
    delivery_partner = models.ForeignKey(

    DeliveryPartner,

    on_delete=models.SET_NULL,

    null=True,

    blank=True

)

class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        related_name="items",
        on_delete=models.CASCADE
    )

    food_name = models.CharField(max_length=255)

    quantity = models.IntegerField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return self.food_name