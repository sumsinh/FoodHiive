import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../api/axios";
import { CartContext } from "../context/CartContext";


function FoodDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [food, setFood] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [recommended, setRecommended] = useState([]);

  const { addToCart } = useContext(CartContext);


  useEffect(() => {

    fetchFood();

    fetchRecommended();

    setQuantity(1);

  }, [id]);



  const fetchFood = async () => {

    try {

      const res = await api.get(`/foods/${id}/`);

      setFood(res.data);

    } catch (error) {

      console.log(error);

    }

  };



  const fetchRecommended = async () => {

    try {

      const res = await api.get("/foods/");


      const filtered = res.data.filter(
        (item) => item.id !== Number(id)
      );


      setRecommended(filtered.slice(0, 3));


    } catch (error) {

      console.log(error);

    }

  };




  const increase = () => {

    setQuantity(quantity + 1);

  };



  const decrease = () => {

    if (quantity > 1) {

      setQuantity(quantity - 1);

    }

  };



  const handleAddCart = () => {

    addToCart({
      ...food,
      quantity,
    });

  };



  if (!food) {

    return (

      <h1 className="pt-28 text-center">

        Loading...

      </h1>

    );

  }




  return (

    <div className="pt-28 px-6 min-h-screen bg-gray-100 pb-10">



      {/* FOOD DETAILS */}


      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">


        <img

          src={food.image}

          alt={food.name}

          className="w-full h-80 object-cover"

        />



        <div className="p-6">



          <div className="flex justify-between items-center">


            <h1 className="text-3xl font-bold">

              {food.name}

            </h1>



            <span className="bg-green-500 text-white px-3 py-1 rounded-lg">

              4.5★

            </span>


          </div>



          <p className="text-gray-500 mt-4">

            {food.description}

          </p>




          <h2 className="text-3xl font-bold text-orange-500 mt-6">

            ₹{food.price * quantity}

          </h2>




          {/* Quantity */}


          <div className="flex items-center gap-5 mt-8">



            <button

              onClick={decrease}

              className="w-12 h-12 rounded-full bg-gray-200 text-xl font-bold"

            >

              -

            </button>




            <span className="text-2xl font-bold">

              {quantity}

            </span>




            <button

              onClick={increase}

              className="w-12 h-12 rounded-full bg-orange-500 text-white text-xl font-bold"

            >

              +

            </button>



          </div>





          <button

            onClick={handleAddCart}

            className="mt-8 w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600"

          >

            Add {quantity} Item To Cart

          </button>



        </div>


      </div>





      {/* RECOMMENDED FOODS */}


      <div className="max-w-4xl mx-auto mt-10">


        <h2 className="text-2xl font-bold mb-5">

          People also ordered

        </h2>



        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">


          {recommended.map((item) => (


            <div

              key={item.id}

              onClick={() =>
                navigate(`/food/${item.id}`)
              }

              className="bg-white rounded-2xl shadow cursor-pointer overflow-hidden hover:shadow-lg transition"

            >



              <img

                src={item.image}

                alt={item.name}

                className="h-40 w-full object-cover"

              />



              <div className="p-4">


                <h3 className="font-bold">

                  {item.name}

                </h3>



                <p className="text-orange-500 font-bold mt-2">

                  ₹{item.price}

                </p>


              </div>



            </div>


          ))}


        </div>



      </div>




    </div>

  );

}


export default FoodDetails;