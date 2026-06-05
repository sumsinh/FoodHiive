from django.db import models
from restaurants.models import Restaurant

class Food(models.Model):
    restaurant = models.ForeignKey(
    Restaurant,
    on_delete=models.CASCADE,
    related_name="foods",
    null=True,
    blank=True
)

    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.URLField()

    def __str__(self):
        return self.name