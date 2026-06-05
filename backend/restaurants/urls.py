from django.urls import path
from .views import (
    RestaurantListView,
    RestaurantDetailView,
    RestaurantFoodsView,
    seed_db,
)

urlpatterns = [
    path("", RestaurantListView.as_view()),
    path("seed/", seed_db),
    path("<int:pk>/", RestaurantDetailView.as_view()),
    path("<int:pk>/foods/", RestaurantFoodsView.as_view()),
]