from django.urls import path
from .views import FoodListView, FoodDetailView


urlpatterns = [
    path("", FoodListView.as_view(), name="foods"),

    path(
        "<int:pk>/",
        FoodDetailView.as_view(),
        name="food-detail"
    ),
]