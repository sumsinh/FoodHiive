import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import LiveMap from "../components/LiveMap";


function TrackOrder() {

  const { id } = useParams();


  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />


      <div className="pt-32 px-6 pb-10">


        <div className="max-w-6xl mx-auto">


          <h1 className="text-3xl font-bold mb-8">
            Track Your Order 🚴
          </h1>


          <div className="grid lg:grid-cols-3 gap-8">


            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">


              {/* MAP */}
              <div className="bg-white rounded-3xl shadow p-5">

                <h2 className="text-xl font-bold mb-4">
                  Live Location
                </h2>


                <LiveMap orderId={id} />


              </div>



              {/* ORDER STATUS */}
              <div className="bg-white rounded-3xl shadow p-6">


                <h2 className="text-xl font-bold mb-6">
                  Order Status
                </h2>


                <div className="space-y-6">


                  <Status
                    active
                    text="Order Confirmed"
                  />


                  <Status
                    active
                    text="Preparing Food"
                  />


                  <Status
                    active
                    text="Delivery Partner Assigned"
                  />


                  <Status
                    active
                    text="Out For Delivery"
                  />


                  <Status
                    text="Delivered"
                  />


                </div>


              </div>


            </div>




            {/* RIGHT SIDE */}
            <div className="space-y-6">


              {/* ETA */}
              <div className="bg-white rounded-3xl shadow p-6">


                <h2 className="text-2xl font-bold text-orange-500">

                  Arriving in 25 mins

                </h2>


                <p className="text-gray-500 mt-2">

                  Order #{id}

                </p>


              </div>




              {/* DELIVERY BOY */}
              <div className="bg-white rounded-3xl shadow p-6">


                <h2 className="text-xl font-bold mb-4">

                  Delivery Partner

                </h2>


                <div className="flex items-center gap-4">


                  <div className="
                  h-16
                  w-16
                  rounded-full
                  bg-orange-200
                  flex
                  items-center
                  justify-center
                  text-3xl
                  ">

                    👨

                  </div>


                  <div>


                    <h3 className="font-bold">

                      Rahul Kumar

                    </h3>


                    <p>

                      ⭐ 4.8 Rating

                    </p>


                  </div>


                </div>



                <button className="
                mt-5
                bg-green-500
                text-white
                w-full
                py-3
                rounded-xl
                ">

                  📞 Call Partner

                </button>



              </div>




              {/* FOOD DETAILS */}
              <div className="bg-white rounded-3xl shadow p-6">


                <h2 className="text-xl font-bold mb-4">

                  Your Food

                </h2>


                <p>
                  🍔 Chicken Burger x 2
                </p>


                <p>
                  🍕 Pizza x 1
                </p>


              </div>


            </div>


          </div>


        </div>


      </div>


    </div>

  );

}




function Status({ text, active }) {

  return (

    <div className="flex items-center gap-4">


      <div
        className={`
        h-8
        w-8
        rounded-full
        flex
        items-center
        justify-center

        ${
          active
          ? "bg-orange-500 text-white"
          : "bg-gray-300"
        }

        `}
      >

        ✓

      </div>


      <p className="font-semibold">

        {text}

      </p>


    </div>

  )

}


export default TrackOrder;