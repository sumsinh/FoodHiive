import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import api from "../api/axios";

function Checkout() {

  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const deliveryFee = 40;

  const grandTotal = totalPrice + deliveryFee;

  const placeOrder = async () => {

  try {

    setLoading(true);

    const orderData = {

      full_name: fullName,

      phone,

      address,

      payment_method:
        paymentMethod === "Cash on Delivery"
          ? "COD"
          : paymentMethod,

      total_price: grandTotal,

      items: cartItems.map((item) => ({
        food_id: item.id,
        food_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }))

    };


    const response = await api.post(
      "/orders/create/",
      orderData
    );


    console.log(response.data);


    localStorage.removeItem("cartItems");


    alert("Order Placed Successfully");


    navigate(
      `/order-success/${response.data.id}`
    );


  } catch (error) {


    console.log(error.response?.data);


    alert(
      JSON.stringify(error.response?.data)
    );


  } finally {


    setLoading(false);


  }

};

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="px-8 pt-32 pb-12">

        <h1 className="text-4xl font-bold text-gray-800 mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-8">

            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Delivery Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  className="h-14 px-4 rounded-xl border border-gray-300 outline-none focus:border-orange-500"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="h-14 px-4 rounded-xl border border-gray-300 outline-none focus:border-orange-500"
                />

                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  className="h-14 px-4 rounded-xl border border-gray-300 outline-none focus:border-orange-500"
                />

                <input
                  type="text"
                  placeholder="Area"
                  className="h-14 px-4 rounded-xl border border-gray-300 outline-none focus:border-orange-500"
                />

                <input
                  type="text"
                  placeholder="City"
                  className="h-14 px-4 rounded-xl border border-gray-300 outline-none focus:border-orange-500"
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  className="h-14 px-4 rounded-xl border border-gray-300 outline-none focus:border-orange-500"
                />

              </div>

            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Payment Method
              </h2>

              <div className="space-y-4">

                <button
                  onClick={() =>
                    setPaymentMethod("Cash on Delivery")
                  }
                  className={`w-full h-14 rounded-2xl border text-left px-5 font-semibold transition ${
                    paymentMethod === "Cash on Delivery"
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300"
                  }`}
                >
                  Cash on Delivery
                </button>

                <button
                  onClick={() => setPaymentMethod("UPI")}
                  className={`w-full h-14 rounded-2xl border text-left px-5 font-semibold transition ${
                    paymentMethod === "UPI"
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300"
                  }`}
                >
                  UPI
                </button>

                <button
                  onClick={() => setPaymentMethod("Card")}
                  className={`w-full h-14 rounded-2xl border text-left px-5 font-semibold transition ${
                    paymentMethod === "Card"
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300"
                  }`}
                >
                  Card
                </button>

              </div>

            </div>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm h-fit sticky top-32">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Order Summary
            </h2>

            <div className="space-y-5">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >

                  <div>

                    <h3 className="font-semibold text-gray-800">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <p className="font-semibold">
                    ₹{item.price * item.quantity}
                  </p>

                </div>

              ))}

            </div>

            <div className="border-t mt-8 pt-6 space-y-4">

              <div className="flex items-center justify-between">

                <p className="text-gray-600">
                  Item Total
                </p>

                <p className="font-semibold">
                  ₹{totalPrice}
                </p>

              </div>

              <div className="flex items-center justify-between">

                <p className="text-gray-600">
                  Delivery Fee
                </p>

                <p className="font-semibold">
                  ₹{deliveryFee}
                </p>

              </div>

              <div className="flex items-center justify-between pt-4 border-t">

                <h3 className="text-2xl font-bold text-gray-800">
                  Total
                </h3>

                <h3 className="text-2xl font-bold text-orange-500">
                  ₹{grandTotal}
                </h3>

              </div>

            </div>

            <button
              onClick={placeOrder}
              disabled={loading}
              className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-lg font-semibold transition mt-8"
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;