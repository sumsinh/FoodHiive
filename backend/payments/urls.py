from django.urls import path

from .views import (
    CreateRazorpayOrderView,
    VerifyPaymentView
)

urlpatterns = [

    path(
        "",
        CreateRazorpayOrderView.as_view(),
        name="create-order"
    ),

    path(
        "verify/",
        VerifyPaymentView.as_view(),
        name="verify-payment"
    ),

]