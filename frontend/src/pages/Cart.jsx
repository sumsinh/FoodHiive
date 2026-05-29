import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";

function Cart() {

  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const deliveryFee = 40;

  const grandTotal = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="px-8 pt-32 pb-10">

        <h1 className="text-4xl font-bold text-gray-800 mb-10">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (

          <div className="bg-white p-10 rounded-3xl text-center shadow-sm">

            <h2 className="text-2xl font-semibold text-gray-700">
              Cart is Empty
            </h2>

            <p className="text-gray-500 mt-3">
              Add some delicious food.
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-10">

            <div className="lg:col-span-2 space-y-6">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="bg-white p-5 rounded-3xl flex items-center gap-5 shadow-sm"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-2xl"
                  />

                  <div className="flex-1">

                    <h2 className="text-2xl font-semibold text-gray-800">
                      {item.name}
                    </h2>

                    <p className="text-orange-500 text-xl font-bold mt-2">
                      ₹{item.price} × {item.quantity}
                    </p>

                    <p className="text-gray-500 mt-1">
                      Subtotal: ₹{item.price * item.quantity}
                    </p>

                    <div className="flex items-center gap-4 mt-5">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-10 h-10 rounded-full bg-gray-200 text-xl font-bold hover:bg-gray-300 transition"
                      >
                        -
                      </button>

                      <span className="text-xl font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-10 h-10 rounded-full bg-orange-500 text-white text-xl font-bold hover:bg-orange-600 transition"
                      >
                        +
                      </button>

                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 font-medium mt-4 hover:text-red-600 transition"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

              <button
                onClick={() => navigate("/home")}
                className="w-full h-14 border-2 border-dashed border-orange-500 text-orange-500 rounded-2xl font-semibold hover:bg-orange-50 transition"
              >
                + Add More Food
              </button>

              <div className="mt-14">

                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                  Recommended For You
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                  <FoodCard
                    id={101}
                    name="French Fries"
                    price="149"
                    image="https://images.unsplash.com/photo-1573080496219-bb080dd4f877"
                  />

                  <FoodCard
                    id={102}
                    name="Cold Coffee"
                    price="129"
                    image="https://images.unsplash.com/photo-1517701604599-bb29b565090c"
                  />

                </div>

              </div>

            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm h-fit sticky top-32">

              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Bill Summary
              </h2>

              <div className="flex items-center justify-between mb-5">

                <p className="text-gray-600 text-lg">
                  Item Total
                </p>

                <p className="text-lg font-semibold">
                  ₹{totalPrice}
                </p>

              </div>

              <div className="flex items-center justify-between mb-5">

                <p className="text-gray-600 text-lg">
                  Delivery Fee
                </p>

                <p className="text-lg font-semibold">
                  ₹{deliveryFee}
                </p>

              </div>

              <div className="border-t pt-5 flex items-center justify-between">

                <h3 className="text-2xl font-bold text-gray-800">
                  Total
                </h3>

                <h3 className="text-2xl font-bold text-orange-500">
                  ₹{grandTotal}
                </h3>

              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-lg font-semibold transition mt-8"
              >
                Proceed to Checkout
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Cart;