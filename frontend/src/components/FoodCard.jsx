import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function FoodCard({ id, name, price, image }) {

  const navigate = useNavigate();

  const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    cartItems,
  } = useContext(CartContext);


  const cartItem = cartItems.find(
    (item) => item.id === id
  );


  return (

    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">


      {/* CLICK AREA */}

      <div
        onClick={() => navigate(`/food/${id}`)}
        className="cursor-pointer"
      >

        <div className="overflow-hidden">

          <img
            src={image}
            alt={name}
            className="w-full h-56 object-cover hover:scale-110 transition duration-500"
          />

        </div>


        <div className="p-5 pb-0">


          <div className="flex items-center justify-between">

            <h3 className="text-2xl font-semibold text-gray-800">

              {name}

            </h3>


            <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-lg">

              4.5★

            </span>


          </div>


          <p className="text-gray-500 mt-3">

            Delicious food delivered fast

          </p>


        </div>


      </div>



      {/* BUTTON AREA */}

      <div className="p-5">


        <div className="flex items-center justify-between">


          <p className="text-2xl font-bold text-orange-500">

            ₹{price}

          </p>



          {cartItem ? (

            <div className="flex flex-col items-end gap-3">


              <div className="flex items-center gap-3">


                <button

                  onClick={() => decreaseQuantity(id)}

                  className="w-9 h-9 rounded-full bg-gray-200 font-bold hover:bg-gray-300 transition"

                >

                  -

                </button>



                <span className="font-semibold text-lg">

                  {cartItem.quantity}

                </span>



                <button

                  onClick={() => increaseQuantity(id)}

                  className="w-9 h-9 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 transition"

                >

                  +

                </button>



              </div>




              <button

                onClick={() => navigate("/cart")}

                className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition"

              >

                View Cart

              </button>



            </div>


          ) : (


            <button

              onClick={() =>
                addToCart({
                  id,
                  name,
                  price,
                  image,
                })
              }

              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-semibold transition"

            >

              Add

            </button>


          )}


        </div>


      </div>


    </div>

  );

}


export default FoodCard;