import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";


function Orders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);



  const statusColor = (status) => {

    if (status === "Order Placed") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "Preparing") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Out For Delivery") {
      return "bg-orange-100 text-orange-700";
    }

    if (status === "Delivered") {
      return "bg-green-100 text-green-700";
    }

    return "bg-red-100 text-red-700";

  };



  const steps = [
    "Order Placed",
    "Preparing",
    "Out For Delivery",
    "Delivered",
  ];



  useEffect(() => {

    fetchOrders();

  }, []);



  const fetchOrders = async () => {

    try {

      const res = await api.get(
        "/orders/my-orders/"
      );


      console.log(res.data);


      setOrders(res.data);


    } catch (error) {

      console.log(error);


    } finally {

      setLoading(false);

    }

  };




  return (

    <>

      <Navbar />



      <div className="min-h-screen bg-gray-100 pt-24 px-4">


        <div className="max-w-5xl mx-auto">



          <h1 className="text-3xl font-bold mb-6">

            My Orders

          </h1>




          {loading ? (


            <p>Loading orders...</p>


          ) : orders.length === 0 ? (


            <div className="bg-white p-6 rounded-xl shadow">


              <p>No orders found.</p>


            </div>



          ) : (



            <div className="space-y-6">



              {orders.map((order) => (



                <div

                  key={order.id}

                  className="bg-white rounded-2xl shadow p-6"

                >



                  {/* Header */}


                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">



                    <div>


                      <h2 className="text-xl font-semibold">

                        Order #{order.id}

                      </h2>



                      <p className="text-gray-500 text-sm">


                        {order.created_at

                          ? new Date(

                              order.created_at

                            ).toLocaleString()

                          : "No Date"}


                      </p>



                    </div>





                    <div className="mt-3 md:mt-0">



                      <span

                        className={`${statusColor(

                          order.status

                        )} px-4 py-1 rounded-full text-sm font-medium`}

                      >


                        {order.status}



                      </span>




                    </div>



                  </div>





                  {/* Tracking Timeline */}



                  <div className="flex justify-between my-8">



                    {steps.map((step) => (



                      <div

                        key={step}

                        className="flex flex-col items-center text-center"

                      >




                        <div


                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold


                          ${

                            steps.indexOf(step) <=

                            steps.indexOf(order.status)


                              ? "bg-orange-500 text-white"


                              : "bg-gray-300"


                          }`}


                        >


                          ✓



                        </div>





                        <p className="text-xs mt-2">


                          {step}


                        </p>




                      </div>



                    ))}



                  </div>






                  {/* Items */}



                  <div className="border-t pt-4 space-y-3">




                    {order.items?.length > 0 ? (



                      order.items.map((item) => (




                        <div


                          key={item.id}


                          className="flex justify-between items-center"



                        >




                          <div>




                            <h3 className="font-medium">


                              {item.food?.name ||

                                item.food_name ||

                                "Food Item"}



                            </h3>





                            <p className="text-gray-500 text-sm">



                              Qty: {item.quantity}




                            </p>





                          </div>





                          <p className="font-semibold">


                            ₹{item.price}


                          </p>




                        </div>





                      ))



                    ) : (



                      <p className="text-gray-500">


                        No items found


                      </p>



                    )}



                  </div>








                  {/* Payment */}




                  <div className="border-t mt-4 pt-4 flex justify-between items-center">





                    <div>




                      <p className="text-sm text-gray-500">


                        Payment Method


                      </p>





                      <p className="font-medium">


                        {order.payment_method || "Cash"}


                      </p>





                    </div>







                    <div className="text-right">



                      <p className="text-sm text-gray-500">


                        Total Amount


                      </p>





                      <p className="text-2xl font-bold">



                        ₹{order.total_price || 0}



                      </p>





                    </div>





                  </div>






                </div>



              ))}




            </div>



          )}




        </div>



      </div>


    </>

  );

}


export default Orders;