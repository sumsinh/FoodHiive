import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        FoodHiive Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Link
          to="/admin/orders"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold text-orange-500">
            Orders
          </h2>

          <p className="text-gray-600 mt-2">
            Manage Orders
          </p>
        </Link>

        <Link
          to="/admin/foods"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold text-orange-500">
            Foods
          </h2>

          <p className="text-gray-600 mt-2">
            Manage Foods
          </p>
        </Link>

        <Link
          to="/admin/restaurants"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold text-orange-500">
            Restaurants
          </h2>

          <p className="text-gray-600 mt-2">
            Manage Restaurants
          </p>
        </Link>

        <Link
          to="/admin/delivery-partners"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold text-orange-500">
            Delivery Partners
          </h2>

          <p className="text-gray-600 mt-2">
            Manage Riders
          </p>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;