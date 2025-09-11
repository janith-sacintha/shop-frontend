import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function OrdersPage(){
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(null)

    useEffect(
        ()=>{
            const token = localStorage.getItem("token")
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/orders" , {
                headers : {
                    Authorization : "Bearer "+token
                }
            }).then(
                (res)=>{
                    setOrders(res.data)
                    setLoading(false)
                }
            ).catch(
                (error)=>{
                    console.log(error)
                    toast.error("Fetching orders failed")

                }
            )
        },
        [loading]
    )

    return(
        <div className="w-full h-screen flex justify-center bg-gray-100 pt-5">
            <div className="w-11/12 bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
                <h1 className="text-4xl font-extrabold text-indigo-600 py-[25px]">My Orders</h1>
                <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200 text-left">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Address</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Items</th>
                    <th className="p-3 text-center">Total</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, i) => (
                    <tr key={i} className="border-b align-top hover:bg-gray-50">
                        <td className="p-3">{order.orderId}</td>
                        <td className="p-3">{order.name}</td>
                        <td className="p-3">{order.address}</td>
                        <td className="p-3">{order.phone}</td>
                        <td className="p-3">
                            <div className="flex flex-col gap-2">
                                {order.items.map((item, j) => (
                                <div key={j} className="flex items-center gap-3">
                                    <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-lg object-cover border border-purple-500"
                                    />
                                    <span>{item.name} × {item.qty}</span>
                                </div>
                                ))}
                            </div>
                        </td>
                        <td className="p-3 text-end">LKR {order.total.toLocaleString("en-us", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,})}
                        </td>
                        <td className="p-3">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="p-3 capitalize">{order.status}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}