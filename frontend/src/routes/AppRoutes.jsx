import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "../pages/Splash";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import FoodDetails from "../pages/FoodDetails";
import OrderSuccess from "../pages/OrderSuccess";
import TrackOrder from "../pages/TrackOrder";
import AdminRoute from "../components/AdminRoute";

// Admin Pages
import AdminDashboard from "../admin/AdminDashboard";
import AdminOrders from "../admin/Orders";
import Foods from "../admin/Foods";
import Restaurants from "../admin/Restaurants";
import DeliveryPartners from "../admin/DeliveryPartners";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* User Routes */}

        <Route path="/" element={<Splash />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/food/:id"
          element={<FoodDetails />}
        />

        <Route
          path="/order-success/:id"
          element={<OrderSuccess />}
        />

        <Route
          path="/track-order/:id"
          element={<TrackOrder />}
        />

       <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  }
/>

<Route
  path="/admin/foods"
  element={
    <AdminRoute>
      <Foods />
    </AdminRoute>
  }
/>

<Route
  path="/admin/restaurants"
  element={
    <AdminRoute>
      <Restaurants />
    </AdminRoute>
  }
/>

<Route
  path="/admin/delivery-partners"
  element={
    <AdminRoute>
      <DeliveryPartners />
    </AdminRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;