import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Loader from "../../components/loader"
import { Link, useNavigate } from "react-router-dom"
import { BiEdit } from "react-icons/bi"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setOrders(res.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        toast.error("Failed to fetch orders")
        setLoading(false)
      })
  }, [loading])

  return (
    <div className="w-full h-full">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen bg-gray-50 py-10 px-6">
          <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <header className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-800">My Orders</h1>
            </header>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-100 text-gray-800 text-sm uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Address</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr
                        key={order.orderId}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {order.orderId}
                        </td>
                        <td className="px-6 py-4">{order.name}</td>
                        <td className="px-6 py-4">{order.address}</td>
                        <td className="px-6 py-4">{order.phone}</td>
                        <td className="px-6 py-4">{order.email}</td>
                        <td className="pr-10 pl-1 py-4 text-green-600 font-semibold text-end">
                          LKR{" "}
                          {order.total?.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide shadow-sm ${
                              order.status.toLowerCase() === "delivered"
                                ? "bg-green-500/15 text-green-700 ring-1 ring-green-400/30"
                                : order.status.toLowerCase() === "processing"
                                ? "bg-amber-500/15 text-amber-700 ring-1 ring-amber-400/30"
                                : order.status.toLowerCase() === "cancelled"
                                ? "bg-rose-500/15 text-rose-700 ring-1 ring-rose-400/30"
                                : order.status.toLowerCase() === "shipped"
                                ? "bg-indigo-500/15 text-indigo-700 ring-1 ring-indigo-400/30"
                                : order.status.toLowerCase() === "pending"
                                ? "bg-slate-500/15 text-slate-700 ring-1 ring-slate-400/30"
                                : "bg-slate-500/15 text-slate-700 ring-1 ring-slate-400/30"
                            }`}
                          >
                            {order.status}
                          </span>

                        </td>
                        <td className="px-6 py-4">
                          <BiEdit
                            className="text-xl cursor-pointer bg-blue-500 text-white font-bold h-[30px] w-[30px] rounded-md p-[5px]"
                            onClick={()=>{
                              navigate("/admin/updateOrder", {
                                state: order
                              })
                            }}
                          >
                            Update
                          </BiEdit>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-6 py-8 text-center text-gray-500 font-medium"
                      >
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
