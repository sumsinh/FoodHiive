import { useNavigate, useParams } from "react-router-dom";

function OrderSuccess() {

  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">

        <div className="text-6xl mb-4">
          🎉
        </div>

        <h1 className="text-2xl font-bold text-green-600">
          Order Placed Successfully
        </h1>

        <p className="text-gray-600 mt-3">
          Your FoodHiive order has been confirmed.
        </p>

        <div className="mt-5 bg-gray-100 p-4 rounded-lg">

          <p className="font-semibold">
            Order ID
          </p>

          <p>
            #{id}
          </p>

          <p className="mt-3 font-semibold">
            Estimated Delivery
          </p>

          <p>
            30 - 40 minutes
          </p>

        </div>


        <button
          onClick={() => navigate(`/track-order/${id}`)}
          className="
          mt-6
          bg-orange-500
          text-white
          px-6
          py-3
          rounded-lg
          w-full
          "
        >
          Track My Order 🚴
        </button>

      </div>

    </div>
  )
}


export default OrderSuccess;