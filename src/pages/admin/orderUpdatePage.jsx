import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState(location.state.status || "pending");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // if needed for auth
      await axios.put(
        import.meta.env.VITE_BACKEND_URL+"/api/orders/"+location.state.orderId, 
        {status},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order status updated successfully!");
      navigate("/admin/orders"); // redirect after update
    } catch (error) {
      toast.error("Failed to update order");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Order Status</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-gray-600 font-medium">Order ID</label>
            <p className="mt-1 text-gray-800">{location.state.orderId}</p>
          </div>

          <div>
            <label className="text-gray-600 font-medium">Customer Name</label>
            <p className="mt-1 text-gray-800">{location.state.name}</p>
          </div>

          <div>
            <label className="text-gray-600 font-medium">Email</label>
            <p className="mt-1 text-gray-800">{location.state.email}</p>
          </div>

          <div>
            <label className="text-gray-600 font-medium">Phone</label>
            <p className="mt-1 text-gray-800">{location.state.phone}</p>
          </div>

          <div className="md:col-span-2">
            <label className="text-gray-600 font-medium">Address</label>
            <p className="mt-1 text-gray-800">{location.state.address}</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-gray-600 font-medium">Items</label>
          <div className="mt-2 border rounded-lg p-4 bg-gray-50">
            {location.state.items.map((item, index) => (
              <div key={index} className="flex items-center mb-3 last:mb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-gray-600">Qty: {item.qty}</p>
                  <p className="text-gray-600">Price: LKR {item.price.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-gray-600 font-medium">Notes</label>
          <p className="mt-1 text-gray-800">{location.state.notes}</p>
        </div>

        <div className="mb-6">
          <label className="text-gray-600 font-medium">Total</label>
          <p className="mt-1 text-gray-800">LKR {location.state.total.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}</p>
        </div>

        <div className="mb-6">
            <label className="text-gray-600 font-medium">Status</label>
            <div className="relative mt-1">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`
                  appearance-none w-full py-3 px-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all
                  ${status === "pending" ? "bg-yellow-100 border-yellow-400 text-yellow-800" : ""}
                  ${status === "processing" ? "bg-blue-100 border-blue-400 text-blue-800" : ""}
                  ${status === "shipped" ? "bg-indigo-100 border-indigo-400 text-indigo-800" : ""}
                  ${status === "delivered" ? "bg-green-100 border-green-400 text-green-800" : ""}
                  ${status === "cancelled" ? "bg-red-100 border-red-400 text-red-800" : ""}
                `}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>


        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </div>
    </div>
  );
}
