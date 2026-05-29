import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login/", formData);

      // Store JWT Tokens
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      // Store User Data Safely
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user || {})
      );

      alert("Login Successful");

      navigate("/home");

    } catch (error) {
      console.log(error);

      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-2xl bg-white rounded-3xl p-10 shadow-lg">

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-orange-500">
            FoodHiive
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Welcome back
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full h-14 px-4 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full h-14 px-4 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500"
          />

          <button
            type="submit"
            className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-lg transition"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;