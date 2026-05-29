from django.db import models


class DeliveryPartner(models.Model):

    name = models.CharField(
        max_length=100
    )

    phone = models.CharField(
        max_length=15
    )

    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        default=5
    )

    latitude = models.FloatField(
        default=12.9716
    )

    longitude = models.FloatField(
        default=77.5946
    )

    is_available = models.BooleanField(
        default=True
    )


    def __str__(self):

        return self.name