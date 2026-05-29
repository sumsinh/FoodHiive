from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status

from .models import Food
from .serializers import FoodSerializer


class FoodListView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):

        foods = Food.objects.all()

        serializer = FoodSerializer(
            foods,
            many=True
        )

        return Response(serializer.data)



class FoodDetailView(APIView):

    permission_classes = [AllowAny]

    def get(self, request, pk):

        try:

            food = Food.objects.get(id=pk)

        except Food.DoesNotExist:

            return Response(
                {"error": "Food not found"},
                status=status.HTTP_404_NOT_FOUND
            )


        serializer = FoodSerializer(food)

        return Response(serializer.data)