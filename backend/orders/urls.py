from django.urls import path

from .views import (
    CreateOrderView,
    UserOrdersView,
    AdminOrderListView,
    AdminOrderStatusUpdateView,
    AdminDashboardStatsView,
)

urlpatterns = [

    path(
        "create/",
        CreateOrderView.as_view()
    ),

    path(
        "my-orders/",
        UserOrdersView.as_view()
    ),

    path(
        "admin/orders/",
        AdminOrderListView.as_view()
    ),

    path(
        "admin/orders/<int:pk>/",
        AdminOrderStatusUpdateView.as_view()
    ),

    path(
        "admin/dashboard-stats/",
        AdminDashboardStatsView.as_view()
    ),

]