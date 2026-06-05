import { useEffect, useState } from "react";
import api from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await api.get(
        "/orders/admin/orders/"
      );

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get(
        "/orders/admin/dashboard-stats/"
      );

      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(
        `/orders/admin/orders/${id}/`,
        { status }
      );

      await fetchOrders();
      await fetchStats();

      alert("Order status updated successfully");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order");
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchStats();

    api
      .get("/users/profile/")
      .then((res) => {
        console.log("PROFILE:", res.data);
      })
      .catch((err) => {
        console.log(
          "PROFILE ERROR:",
          err.response?.data
        );
      });
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-xl">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">
        Orders Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm">
            Total Orders
          </h3>
          <p className="text-3xl font-bold">
            {stats?.total_orders || 0}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm">
            Revenue
          </h3>
          <p className="text-3xl font-bold">
            ₹{stats?.total_revenue || 0}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm">
            Pending
          </h3>
          <p className="text-3xl font-bold">
            {stats?.pending_orders || 0}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm">
            Delivered
          </h3>
          <p className="text-3xl font-bold">
            {stats?.delivered_orders || 0}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm">
            Cancelled
          </h3>
          <p className="text-3xl font-bold">
            {stats?.cancelled_orders || 0}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Order ID</th>
              <th className="border p-3">Customer</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Address</th>
              <th className="border p-3">Amount</th>
              <th className="border p-3">Payment</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Created</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border p-3">
                  {order.id}
                </td>

                <td className="border p-3">
                  {order.full_name}
                </td>

                <td className="border p-3">
                  {order.phone}
                </td>

                <td className="border p-3">
                  {order.address}
                </td>

                <td className="border p-3">
                  ₹{order.total_price}
                </td>

                <td className="border p-3">
                  {order.payment_method}
                </td>

                <td className="border p-3">
                  <select
                    value={order.status}
                    onChange={(e) => {
                      const updatedOrders =
                        orders.map((o) =>
                          o.id === order.id
                            ? {
                                ...o,
                                status:
                                  e.target.value,
                              }
                            : o
                        );

                      setOrders(updatedOrders);
                    }}
                    className="border rounded p-2"
                  >
                    <option>
                      Order Placed
                    </option>
                    <option>
                      Preparing
                    </option>
                    <option>
                      Out For Delivery
                    </option>
                    <option>
                      Delivered
                    </option>
                    <option>
                      Cancelled
                    </option>
                  </select>
                </td>

                <td className="border p-3">
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </td>

                <td className="border p-3">
                  <button
                    onClick={() =>
                      updateStatus(
                        order.id,
                        order.status
                      )
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;