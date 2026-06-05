from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Restaurant
from .serializers import RestaurantSerializer
from .seed_data import seed_database

from foods.models import Food
from foods.serializers import FoodSerializer


@api_view(["GET"])
def seed_db(request):
    seed_database()
    return Response({"message": "Database seeded"})


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