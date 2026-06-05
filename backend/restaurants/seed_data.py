from restaurants.models import Restaurant
from foods.models import Food


def seed_database():
    if Restaurant.objects.exists():
        return

    restaurants_data = [
        {
            "name": "KFC",
            "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
            "description": "Fried chicken and burgers",
            "address": "Bangalore",
        },
        {
            "name": "Dominos",
            "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591",
            "description": "Pizza delivery",
            "address": "Bangalore",
        },
        {
            "name": "Burger King",
            "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            "description": "Burgers and fries",
            "address": "Bangalore",
        },
        {
            "name": "Pizza Hut",
            "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591",
            "description": "Delicious pizzas",
            "address": "Bangalore",
        },
        {
            "name": "Meghana Foods",
            "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
            "description": "Famous biryani",
            "address": "Bangalore",
        },
        {
            "name": "Empire Restaurant",
            "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
            "description": "Indian cuisine",
            "address": "Bangalore",
        },
    ]

    restaurants = {}

    for data in restaurants_data:
        restaurant = Restaurant.objects.create(**data)
        restaurants[data["name"]] = restaurant

    foods = [
        {
            "restaurant": restaurants["KFC"],
            "name": "Chicken Burger",
            "price": 199,
            "description": "Crispy chicken burger",
            "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        },
        {
            "restaurant": restaurants["KFC"],
            "name": "Hot Wings",
            "price": 249,
            "description": "Spicy chicken wings",
            "image": "https://images.unsplash.com/photo-1527477396000-e27163b481c2",
        },
        {
            "restaurant": restaurants["Dominos"],
            "name": "Margherita Pizza",
            "price": 299,
            "description": "Classic cheese pizza",
            "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591",
        },
        {
            "restaurant": restaurants["Dominos"],
            "name": "Veggie Pizza",
            "price": 399,
            "description": "Loaded vegetable pizza",
            "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591",
        },
        {
            "restaurant": restaurants["Burger King"],
            "name": "Whopper",
            "price": 249,
            "description": "Signature burger",
            "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        },
        {
            "restaurant": restaurants["Pizza Hut"],
            "name": "Farmhouse Pizza",
            "price": 449,
            "description": "Fresh veggie pizza",
            "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591",
        },
        {
            "restaurant": restaurants["Meghana Foods"],
            "name": "Chicken Biryani",
            "price": 299,
            "description": "Hyderabadi style biryani",
            "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
        },
        {
            "restaurant": restaurants["Empire Restaurant"],
            "name": "Butter Chicken",
            "price": 349,
            "description": "Creamy butter chicken",
            "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
        },
    ]

    for food in foods:
        Food.objects.create(**food)