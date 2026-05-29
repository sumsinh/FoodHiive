from rest_framework.views import APIView
from rest_framework.response import Response
from orders.models import Order


class DeliveryLocationView(APIView):

    def get(self, request, order_id):

        try:

            order = Order.objects.get(
                id=order_id
            )


            partner = order.delivery_partner


            if not partner:

                return Response(
                    {
                        "message":
                        "No delivery partner assigned"
                    }
                )


            return Response({

                "name": partner.name,

                "phone": partner.phone,

                "rating": partner.rating,

                "latitude": partner.latitude,

                "longitude": partner.longitude,

            })


        except Order.DoesNotExist:


            return Response(
                {
                    "error":
                    "Order not found"
                },
                status=404
            )