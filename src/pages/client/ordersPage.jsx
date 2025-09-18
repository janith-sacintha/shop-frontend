import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import Loader from "../../components/loader"
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaShippingFast,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa"

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

  // Group orders by status
  const groupedOrders = orders.reduce((groups, order) => {
    const status = order.status.toLowerCase()
    if (!groups[status]) groups[status] = []
    groups[status].push(order)
    return groups
  }, {})

  // Status configurations (title, color, icon)
  const statusConfig = {
    delivered: {
      title: "Delivered Orders",
      color: "text-green-600",
      bg: "bg-green-50",
      icon: <FaCheckCircle className="text-green-500" />,
    },
    processing: {
      title: "Processing Orders",
      color: "text-amber-600",
      bg: "bg-amber-50",
      icon: <FaClock className="text-amber-500" />,
    },
    shipped: {
      title: "Shipped Orders",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      icon: <FaShippingFast className="text-indigo-500" />,
    },
    pending: {
      title: "Pending Orders",
      color: "text-sky-600",
      bg: "bg-sky-50",
      icon: <FaClock className="text-sky-500" />,
    },
    cancelled: {
      title: "Cancelled Orders",
      color: "text-rose-600",
      bg: "bg-rose-50",
      icon: <FaTimesCircle className="text-rose-500" />,
    },
  }

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-50 pt-10">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-11/12 max-w-6xl">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-10">
            My Orders
          </h1>

          <div className="space-y-12">
            {Object.keys(statusConfig).map((statusKey) => {
              const config = statusConfig[statusKey]
              const ordersByStatus = groupedOrders[statusKey] || []

              if (ordersByStatus.length === 0) return null

              return (
                <div key={statusKey}>
                  {/* Section header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-2xl">{config.icon}</div>
                    <h2
                      className={`text-2xl font-bold ${config.color} tracking-tight`}
                    >
                      {config.title}
                    </h2>
                  </div>

                  {/* Orders grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ordersByStatus.map((order, i) => (
                      <div
                        key={i}
                        onClick={() => navigate(`/my-orders/${order.orderId}`)}
                        className={`rounded-2xl shadow-md hover:shadow-xl transition duration-200 p-6 cursor-pointer border border-gray-100 ${config.bg}`}
                      >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-lg font-bold text-gray-800">
                            Order #{order.orderId}
                          </h2>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${config.color} bg-white border border-gray-200`}
                          >
                            {order.status}
                          </span>
                        </div>

                        {/* Order Items Preview */}
                        <div className="flex gap-4 mb-4">
                          {order.items.slice(0, 3).map((item, j) => (
                            <img
                              key={j}
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                            />
                          ))}
                          {order.items.length > 3 && (
                            <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gray-100 text-gray-600 font-semibold">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>

                        {/* Order Info */}
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
                            <span>
                              {new Date(order.date).toLocaleDateString()}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
