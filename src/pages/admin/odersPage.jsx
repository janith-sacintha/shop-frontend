import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Loader from "../../components/loader"
import { Link, useNavigate } from "react-router-dom"
import { BiEdit } from "react-icons/bi"
import Paginator from "../../components/paginator.jsx"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  //pagination ----------------------------------
  const [page , setPage] = useState(1)
  const [totalPages , setTotalpages] = useState(0)
  const [limit , setLimit] = useState(10)

  const [popUpVissible, setPopUpVissible] = useState(false)
  const [clickedOrder, setClickedOrder] = useState(null)
  const [status, setStatus] = useState("pending");
  const [notes , setNotes] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders/"+page+"/"+limit, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setOrders(res.data.orders)
        setTotalpages(res.data.totalPages)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        toast.error("Failed to fetch orders")
        setLoading(false)
      })
  }, [page, limit,loading])

const handleUpdate = async () => {
    setPopUpVissible(false)
    try {
      
      const token = localStorage.getItem("token"); // if needed for auth
      await axios.put(
        import.meta.env.VITE_BACKEND_URL+"/api/orders/"+clickedOrder.orderId, 
        {
          status : status
          ,notes : notes
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order status updated successfully!");
      setLoading(true);
      
    } catch (error) {
      toast.error("Failed to update order");
      console.log(error)
    }
  };


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
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr
                        key={order.orderId}
                        className="hover:bg-gray-300 transition"
                        onClick={
                          ()=>
                            {
                              setNotes(order.notes)
                              setStatus(order.status)
                              setClickedOrder(order)
                              setPopUpVissible(true)                            
                            }
                        }
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
                        {
                        /*
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
                        */
                        }
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

              {
                popUpVissible && (
                  <div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex items-center justify-center">
                    
                      {
                        <div className="bg-white shadow-xl rounded-2xl w-[800px] h-[850px] p-8 relative">

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <label className="text-gray-600 font-medium">Order ID</label>
                              <p className="mt-1 text-gray-800">{clickedOrder.orderId}</p>
                            </div>

                            <div>
                              <label className="text-gray-600 font-medium">Customer Name</label>
                              <p className="mt-1 text-gray-800">{clickedOrder.name}</p>
                            </div>

                            <div>
                              <label className="text-gray-600 font-medium">Email</label>
                              <p className="mt-1 text-gray-800">{clickedOrder.email}</p>
                            </div>

                            <div>
                              <label className="text-gray-600 font-medium">Phone</label>
                              <p className="mt-1 text-gray-800">{clickedOrder.phone}</p>
                            </div>

                            <div className="md:col-span-2">
                              <label className="text-gray-600 font-medium">Address</label>
                              <p className="mt-1 text-gray-800">{clickedOrder.address}</p>
                            </div>
                          </div>

                          <div className="mb-6">
                            <label className="text-gray-600 font-medium">Items</label>
                            <div className="mt-2 border rounded-lg p-4 bg-gray-50 overflow-y-scroll h-[100px]">
                              {clickedOrder.items.map((item, index) => (
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
                            <textarea 
                              className="w-full h-[100px] overflow-y-auto border-[1px] rounded-2xl mt-2 p-[5px]"
                              value={notes}
                              onChange={(e)=>{setNotes(e.target.value)}}
                            >

                            </textarea>
                          </div>

                          <div className="mb-6">
                            <label className="text-gray-600 font-medium">Total</label>
                            <p className="mt-1 text-gray-800">LKR {clickedOrder.total.toLocaleString("en-US", {
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
                                
                              </div>
                            </div>
                          </div>

                          {
                          (status!=clickedOrder.status || notes!=clickedOrder.notes) && <button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                          >
                            {loading ? "Updating..." : "Update Status"}
                          </button>
                          }

                          {
                            <button 
                              className="absolute right-[-30px] top-[-30px] bg-red-500 border-[1px] border-red-500 text-white font-bold h-[30px] w-[30px] rounded-full cursor-pointer hover:text-red-500 hover:bg-transparent"
                              onClick={
                                ()=>{setPopUpVissible(false)}
                              }
                            >
                              X
                            </button>
                          }

                        </div>
                      }

                      
                    </div>
                  
                )
              }
              
              <Paginator currentPage={page} setCurrentPage={setPage} totalPages={totalPages} limit={limit} setLimit={setLimit} setLoading={setLoading}/>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}
