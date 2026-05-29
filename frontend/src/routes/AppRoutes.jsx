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

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

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

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;