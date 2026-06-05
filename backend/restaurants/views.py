from rest_framework import generics
from .models import Restaurant
from .serializers import RestaurantSerializer

from foods.models import Food
from foods.serializers import FoodSerializer


class RestaurantListView(generics.ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class RestaurantDetailView(generics.RetrieveAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class RestaurantFoodsView(generics.ListAPIView):
    serializer_class = FoodSerializer

    def get_queryset(self):
        restaurant_id = self.kwargs["pk"]
        return Food.objects.filter(restaurant_id=restaurant_id)