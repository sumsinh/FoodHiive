import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm px-8 py-4 flex items-center justify-between z-50">
      
      <Link to="/home">
        <h1 className="text-3xl font-bold text-orange-500 cursor-pointer">
          FoodHiive
        </h1>
      </Link>

      <div className="flex items-center gap-6">

        <button className="text-gray-700 font-medium hover:text-orange-500 transition">
          Search
        </button>

        <Link
          to="/cart"
          className="text-gray-700 font-medium hover:text-orange-500 transition relative"
        >
          Cart

          {totalCartItems > 0 && (
            <span className="absolute -top-3 -right-4 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </Link>

        <Link
          to="/orders"
          className="text-gray-700 font-medium hover:text-orange-500 transition"
        >
          Orders
        </Link>

        <Link
          to="/profile"
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition"
        >
          Profile
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;