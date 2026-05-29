import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
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

      await api.post("/users/register/", formData);

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error.response.data);

      alert("Something went wrong");
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
            Create your account
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
            className="w-full h-14 px-4 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 text-gray-700"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full h-14 px-4 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 text-gray-700"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full h-14 px-4 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 text-gray-700"
          />

          <button
            type="submit"
            className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-lg transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8">
          Already have an account?

          <span
            onClick={() => navigate("/login")}
            className="text-orange-500 font-semibold ml-2 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;