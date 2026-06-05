import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import api from "../api/axios";

function Home() {

  const [foods, setFoods] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    "Burger",
    "Pizza",
    "Drinks",
    "Dessert",
    "Biryani",
  ];

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {
  fetchFoods();

  api.get("/users/profile/")
    .then((res) => {
      console.log("PROFILE:", res.data);
    })
    .catch((err) => {
      console.log("PROFILE ERROR:", err.response?.data);
    });

}, []);

  const fetchFoods = async () => {

    try {

      const response = await api.get("/foods/");

      console.log(response.data);

      if (Array.isArray(response.data)) {
        setFoods(response.data);
      } else {
        setFoods([]);
      }

    } catch (error) {

      console.log(error);

      setFoods([]);

    }
  };

  const filteredFoods = foods.filter((food) => {

    if (!food.name) return false;

    return food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  });

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <section className="px-8 pt-32 pb-16">

        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
          Order food to your doorstep
        </h1>

        <p className="text-gray-500 text-lg mt-5 max-w-2xl">
          Discover the best restaurants and delicious meals near you.
        </p>

        <div className="mt-10">

          <input
            type="text"
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full max-w-xl h-14 px-5 rounded-xl border border-gray-300 outline-none focus:border-orange-500 bg-white"
          />

        </div>


        <div className="flex gap-3 overflow-x-auto py-8">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-white border border-gray-300"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

        <div className="mt-10">

          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Popular Foods
          </h2>

          {filteredFoods.length === 0 ? (

            <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

              <h3 className="text-2xl font-bold text-gray-700">
                No Foods Found
              </h3>

              <p className="text-gray-500 mt-2">
                Try searching something else.
              </p>

            </div>


          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredFoods.map((food) => (

                <FoodCard
                  key={food.id}
                  id={food.id}
                  name={food.name}
                  price={food.price}
                  image={food.image}
                />

              ))}

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default Home;