import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  FaUserCircle,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { CartContext } from "../context/CartContext";
import api from "../api/axios";


function Profile() {

  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);

  const [orders, setOrders] = useState([]);

  const [user, setUser] = useState(null);


  useEffect(() => {

    if (!localStorage.getItem("access")) {
      navigate("/login");
      return;
    }

    fetchProfile();
    fetchOrders();

  }, [navigate]);


  const fetchProfile = async () => {

    try {

      const response = await api.get("/users/profile/");

      console.log("USER DATA:", response.data);

      setUser(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  const fetchOrders = async () => {

    try {

      const response = await api.get("/orders/my-orders/");

      setOrders(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  const handleLogout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/login");

  };


  return (

    <div className="min-h-screen bg-gray-100 pt-28 px-4">

      <div className="max-w-md mx-auto">


        {/* Profile Header */}

        <div className="bg-white rounded-3xl shadow-md p-6 flex items-center gap-4">

          <FaUserCircle className="text-6xl text-orange-500" />

          <div>

            <h1 className="text-2xl font-bold">

              {user?.username || "Loading..."}

            </h1>


            <p className="text-gray-500">

              {user?.email || ""}

            </p>

          </div>

        </div>



        {/* Stats */}

        <div className="grid grid-cols-2 gap-4 mt-6">


          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">

            <h2 className="text-2xl font-bold text-orange-500">

              {orders.length}

            </h2>

            <p className="text-gray-500 text-sm">

              Total Orders

            </p>

          </div>



          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">

            <h2 className="text-2xl font-bold text-orange-500">

              {cartItems.length}

            </h2>


            <p className="text-gray-500 text-sm">

              Cart Items

            </p>

          </div>


        </div>




        {/* Menu */}


        <div className="bg-white rounded-3xl shadow-md mt-6 overflow-hidden">


          <Link

            to="/orders"

            className="flex items-center gap-4 px-6 py-5 hover:bg-gray-50 transition border-b"

          >

            <FaShoppingBag className="text-orange-500 text-xl" />


            <span className="font-medium">

              My Orders

            </span>


          </Link>



          <button className="w-full flex items-center gap-4 px-6 py-5 hover:bg-gray-50 transition border-b text-left">

            <FaMapMarkerAlt className="text-orange-500 text-xl" />

            <span className="font-medium">

              Saved Addresses

            </span>

          </button>



          <button className="w-full flex items-center gap-4 px-6 py-5 hover:bg-gray-50 transition border-b text-left">

            <FaCreditCard className="text-orange-500 text-xl" />


            <span className="font-medium">

              Payment Methods

            </span>

          </button>



          <button className="w-full flex items-center gap-4 px-6 py-5 hover:bg-gray-50 transition border-b text-left">

            <FaCog className="text-orange-500 text-xl" />


            <span className="font-medium">

              Settings

            </span>

          </button>



          <button

            onClick={handleLogout}

            className="w-full flex items-center gap-4 px-6 py-5 hover:bg-red-50 transition text-left"

          >

            <FaSignOutAlt className="text-red-500 text-xl" />


            <span className="font-medium text-red-500">

              Logout

            </span>


          </button>


        </div>


      </div>

    </div>

  );

}


export default Profile;