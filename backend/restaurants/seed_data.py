from restaurants.models import Restaurant
from foods.models import Food

def seed_database():
    if Restaurant.objects.exists():
        return

    kfc = Restaurant.objects.create(
        name="KFC",
        image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
        description="Fried chicken and burgers",
        address="Bangalore",
    )

    dominos = Restaurant.objects.create(
        name="Dominos",
        image="https://images.unsplash.com/photo-1513104890138-7c749659a591",
        description="Pizza delivery",
        address="Bangalore",
    )

    Food.objects.create(
        restaurant=kfc,
        name="Chicken Burger",
        price=199,
        description="Crispy chicken burger",
        image="https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    )

    Food.objects.create(
        restaurant=dominos,
        name="Margherita Pizza",
        price=299,
        description="Classic cheese pizza",
        image="https://images.unsplash.com/photo-1513104890138-7c749659a591",
    )