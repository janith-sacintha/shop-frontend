import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { BiTrash } from "react-icons/bi"
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function CheckoutPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [cart, setCart] = useState(location.state?.items || [])

  if (location.state == null) {
    toast.error("Please add products to the cart first")
    navigate("/products")
  }

  function getTotal() {
    let total = 0
    cart.forEach((item) => {
      total += item.price * item.quantity
    })
    return total
  }

  async function placeOrder() {
    const token = localStorage.getItem("token")
    if (token == null) {
      toast.error("Login first to place the Order")
      navigate("/login")
      return
    }

    const order = {
      address: "kandy",
      phone: "0710441781",
      items: [],
    }

    cart.forEach((item) => {
      order.items.push({
        productId: item.productId,
        qty: item.quantity,
      })
    })

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success("Order placed successfully")
    } catch (error) {
      console.error(error, "error placing cart")
      toast.error("Failed to place order")
      return
    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center py-10 gap-6 bg-gray-50">
      {cart.map((item, index) => {
        return (
          <div
            key={item.productId}
            className="w-[700px] h-[160px] shadow-lg rounded-lg border border-purple-300 flex items-center p-6 relative bg-white"
          >
            <img
              src={item.image}
              className="w-[100px] h-[100px] object-cover rounded-md"
            />
            <div className="w-[300px] flex flex-col justify-center px-6 font-bold">
              <h1 className="text-lg text-gray-700">{item.name}</h1>
              <p className="font-semibold text-green-600">
                LKR{" "}
                {item.price.toLocaleString("en-us", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <Link
                to={`/overview/${item.productId}`}
                className="mt-2 text-sm rounded-md bg-red-100 text-red-600 text-center h-[30px] w-[150px] py-1 hover:bg-red-200 transition"
              >
                view product info &raquo;
              </Link>
            </div>
            <div className="w-[120px] flex justify-center items-center gap-3">
              <button
                className="cursor-pointer w-8 h-8 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
                onClick={() => {
                  const newCart = [...cart]
                  newCart[index].quantity -= 1
                  if (newCart[index].quantity <= 0) {
                    newCart.splice(index, 1)
                  }
                  setCart(newCart)
                }}
              >
                -
              </button>
              <span className="w-6 text-center font-semibold">
                {item.quantity}
              </span>
              <button
                className="cursor-pointer w-8 h-8 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
                onClick={() => {
                  const newCart = [...cart]
                  newCart[index].quantity += 1
                  setCart(newCart)
                }}
              >
                +
              </button>
            </div>
            <div className="w-[180px] flex items-center justify-end text-gray-700 font-semibold">
              LKR{" "}
              {(item.quantity * item.price).toLocaleString("en-us", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <button
              className="cursor-pointer absolute right-[-55px] w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center border-2 border-red-600 hover:bg-white hover:text-red-600 transition"
              onClick={() => {
                const newCart = [...cart]
                newCart.splice(index, 1)
                setCart(newCart)
              }}
            >
              <BiTrash />
            </button>
          </div>
        )
      })}
      <div className="relative w-[700px] h-[120px] shadow-lg rounded-md border border-blue-300 flex flex-col justify-center items-end px-6 bg-white">
        <span className="font-bold text-lg text-gray-700">
            Total : {" "}
            <span className="text-green-600">
                LKR{" "}
                {getTotal().toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </span>
        </span>
        <button
          className="cursor-pointer mt-2 w-[200px] h-[45px] rounded-md border-2 border-orange-500 bg-orange-500 text-white font-bold hover:bg-white hover:text-orange-500 hover:scale-105 transition"
          onClick={placeOrder}
        >
          Place Order
        </button>
        <Link
          className="absolute left-[250px] bottom-3 text-sm text-orange-500 font-semibold"
          to="/login"
        >
          Login first to place your Order
        </Link>
      </div>
    </div>
  )
}
