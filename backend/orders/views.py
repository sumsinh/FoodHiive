from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.permissions import IsAdminUser

from .models import Order
from .serializers import OrderSerializer
from .serializers import AdminOrderSerializer


class CreateOrderView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = OrderSerializer(
            data=request.data,
            context={"request": request}
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class UserOrdersView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        orders = Order.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = OrderSerializer(
            orders,
            many=True
        )

        return Response(serializer.data)


class AdminOrderListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        print("USER:", request.user)
        print("IS STAFF:", request.user.is_staff)
        print("IS SUPERUSER:", request.user.is_superuser)

        orders = Order.objects.all().order_by("-created_at")

        serializer = AdminOrderSerializer(
            orders,
            many=True
        )

        return Response(serializer.data)


class AdminOrderStatusUpdateView(APIView):

    permission_classes = [IsAdminUser]

    def patch(self, request, pk):

        try:
            order = Order.objects.get(id=pk)

        except Order.DoesNotExist:

            return Response(
                {"error": "Order not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        new_status = request.data.get("status")

        valid_statuses = [
            "Order Placed",
            "Preparing",
            "Out For Delivery",
            "Delivered",
            "Cancelled"
        ]

        if new_status not in valid_statuses:

            return Response(
                {"error": "Invalid status"},
                status=status.HTTP_400_BAD_REQUEST
            )

        order.status = new_status
        order.save()

        return Response(
            {
                "message": "Status updated",
                "status": order.status
            }
        )


class AdminDashboardStatsView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        orders = Order.objects.all()

        total_orders = orders.count()

        total_revenue = sum(
            order.total_price
            for order in orders.filter(status="Delivered")
        )

        pending_orders = orders.filter(
            status="Order Placed"
        ).count()

        delivered_orders = orders.filter(
            status="Delivered"
        ).count()

        cancelled_orders = orders.filter(
            status="Cancelled"
        ).count()

        return Response({
            "total_orders": total_orders,
            "total_revenue": total_revenue,
            "pending_orders": pending_orders,
            "delivered_orders": delivered_orders,
            "cancelled_orders": cancelled_orders,
        })