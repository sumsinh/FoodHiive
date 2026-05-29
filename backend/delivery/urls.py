from django.urls import path
from .views import DeliveryLocationView


urlpatterns = [

    path(
        "order/<int:order_id>/location/",
        DeliveryLocationView.as_view()
    ),

]