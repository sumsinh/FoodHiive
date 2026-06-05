import razorpay
import hmac
import hashlib

from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings


class CreateRazorpayOrderView(APIView):

    def post(self, request):

        amount = request.data.get("amount")

        client = razorpay.Client(
            auth=(
                settings.RAZORPAY_KEY_ID,
                settings.RAZORPAY_KEY_SECRET
            )
        )

        order = client.order.create({
            "amount": int(float(amount) * 100),
            "currency": "INR",
            "payment_capture": 1
        })

        return Response(order)


class VerifyPaymentView(APIView):

    def post(self, request):

        razorpay_order_id = request.data.get(
            "razorpay_order_id"
        )

        razorpay_payment_id = request.data.get(
            "razorpay_payment_id"
        )

        razorpay_signature = request.data.get(
            "razorpay_signature"
        )

        generated_signature = hmac.new(
            bytes(settings.RAZORPAY_KEY_SECRET, "utf-8"),
            bytes(
                f"{razorpay_order_id}|{razorpay_payment_id}",
                "utf-8"
            ),
            hashlib.sha256
        ).hexdigest()

        if generated_signature == razorpay_signature:

            return Response({
                "success": True
            })

        return Response(
            {
                "success": False
            },
            status=400
        )