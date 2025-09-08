import { useState } from "react"
import { addToCart, getCart, getTotal } from "../../utils/cart.js"
import { BiTrash } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"

export default function CartPage() {
  const navigate = useNavigate()
  const [cart, setCart] = useState(getCart())

  return (
    <div className="w-full h-screen flex flex-col items-center py-10 gap-6 bg-gray-50">
      {cart.map((item) => {
        return (
          <div
            key={item.productId}
            className="w-[700px] h-[150px] bg-white shadow-lg rounded-2xl border border-purple-300 flex items-center px-6 relative hover:shadow-2xl transition"
          >
            <img
              src={item.image}
              className="w-[100px] h-[100px] object-cover rounded-lg border border-gray-200"
            />

            <div className="w-[300px] flex flex-col justify-center px-6 font-semibold">
              <h1 className="text-lg text-gray-800">{item.name}</h1>
              <p className="text-purple-600 font-bold">
                LKR{" "}
                {item.price.toLocaleString("en-us", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <Link to={`/overview/${item.productId}`} className="text-red-500 text-sm h-[30px] w-[150px] rounded-md bg-red-200 flex items-center justify-center">view product info &raquo;</Link>
            </div>

            <div className="w-[120px] flex justify-center items-center gap-3">
              <button
                className="w-8 h-8 bg-blue-500 text-white font-bold rounded-md cursor-pointer hover:bg-blue-400 flex items-center justify-center"
                onClick={() => {
                  addToCart(item, -1)
                  setCart(getCart())
                }}
              >
                -
              </button>
              <span className="w-6 text-center font-medium">{item.quantity}</span>
              <button
                className="w-8 h-8 bg-blue-500 text-white font-bold rounded-md cursor-pointer hover:bg-blue-400 flex items-center justify-center"
                onClick={() => {
                  addToCart(item, 1)
                  setCart(getCart())
                }}
              >
                +
              </button>
            </div>

            <div className="flex-1 flex items-center justify-end pr-6">
              <span className="font-bold text-gray-700">
                LKR{" "}
                {(item.quantity * item.price).toLocaleString("en-us", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <button
              className="absolute -right-10 w-9 h-9 bg-red-600 text-white rounded-full flex items-center justify-center border-2 border-red-600 hover:bg-white hover:text-red-600 transition"
              onClick={() => {
                addToCart(item, -item.quantity)
                setCart(getCart())
              }}
            >
              <BiTrash size={18} />
            </button>
          </div>
        )
      })}

      <div className="w-[700px] h-[140px] bg-white shadow-lg rounded-2xl border border-blue-300 flex flex-col justify-center items-end pr-8 gap-4">
        <span className="text-lg font-bold text-gray-800">
          Total:{" "}
          <span className="text-green-600">
            LKR{" "}
            {getTotal().toLocaleString("en-us", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </span>

        <div className="flex gap-4">
          <button
            className="w-[200px] h-[45px] rounded-lg border-2 border-blue-500 bg-blue-500 text-white font-semibold hover:bg-white hover:text-blue-500 transition"
            onClick={() => {
              navigate("/products")
            }}
          >
            Continue Shopping
          </button>

          <button
            className="w-[200px] h-[45px] rounded-lg border-2 border-orange-500 bg-orange-500 text-white font-semibold hover:bg-white hover:text-orange-500 transition"
            onClick={() => {
              navigate("/checkout", { state: { items: cart } })
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
