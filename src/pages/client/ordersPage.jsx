import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import Loader from "../../components/loader"
import { FaBoxOpen, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setOrders(res.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        toast.error("Fetching orders failed")
      })
  }, [])

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-50 pt-10">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-11/12 max-w-5xl">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-8">
            My Orders
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order, i) => (
              <div
                key={i}
                onClick={() => navigate(`/my-orders/${order.orderId}`)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-200 p-6 cursor-pointer border border-gray-100"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    Order #{order.orderId}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      {
                        delivered: "bg-green-500 text-white",
                        processing: "bg-amber-500 text-white",
                        cancelled: "bg-rose-600 text-white",
                        shipped: "bg-indigo-600 text-white",
                        pending: "bg-sky-500 text-white",
                      }[order.status.toLowerCase()] ||
                      "bg-gray-400 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex gap-4 mb-4">
                  {order.items.slice(0, 3).map((item, j) => (
                    <img
                      key={j}
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover border border-indigo-200"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gray-100 text-gray-600 font-semibold">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  <p className="flex items-center gap-2">
                    <FaBoxOpen className="text-indigo-500" />
                    <span>{order.items.length} items</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-green-500" />
                    <span>
                      LKR{" "}
                      {order.total.toLocaleString("en-us", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-rose-500" />
                    <span>{new Date(order.date).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
