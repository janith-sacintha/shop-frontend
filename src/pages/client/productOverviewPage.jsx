import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/loader"
import ImageSlider from "../../components/imageSlider"
import { addToCart, getCart } from "../../utils/cart"

export default function ProductOverviewPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const navigate = useNavigate()
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + params.productId)
        .then((res) => {
          setProduct(res.data)
          setStatus("success")
        })
        .catch(() => {
          setStatus("error")
          toast.error("Failed to fetch product")
        })
    }
  }, [status])

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      {status === "loading" && <Loader />}

      {status === "success" && (
        <div className="w-[1200px] h-[700px] bg-white shadow-2xl rounded-2xl flex overflow-hidden">
          
          <div className="w-[50%] h-full flex items-center justify-center bg-gray-100">
            <ImageSlider images={product.images} />
          </div>

          <div className="w-[50%] h-full flex flex-col px-12 py-10">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <span className="text-sm text-orange-500 mt-2">
              {product.altNames.join(" | ")}
            </span>

            <p className="mt-6 text-gray-600 leading-relaxed text-justify">
              {product.description}
            </p>

            <div className="mt-8">
              {product.labelledPrice > product.price ? (
                <div className="flex items-center gap-4">
                  <span className="line-through text-red-500 text-lg">
                    LKR {product.labelledPrice.toLocaleString("en-us")}
                  </span>
                  <span className="text-3xl text-green-700 font-bold">
                    LKR{" "}
                    {product.price.toLocaleString("en-us", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ) : (
                <span className="text-3xl text-green-700 font-bold">
                  LKR{" "}
                  {product.price.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              )}
            </div>

            <div className="mt-10 flex gap-6">
              <button
                className="w-[200px] h-[50px] bg-orange-500 rounded-lg text-white font-semibold shadow-md hover:bg-white hover:text-orange-500 border-2 border-orange-500 transition"
                onClick={() => {
                  addToCart(product, 1)
                  toast.success("Product added to cart")
                }}
              >
                Add to Cart
              </button>
              <button
                className="w-[200px] h-[50px] bg-green-700 rounded-lg text-white font-semibold shadow-md hover:bg-white hover:text-green-700 border-2 border-green-700 transition"
                onClick={() => {
                  navigate("/checkout", {
                    state: {
                      items: [
                        {
                          productId: product.productId,
                          quantity: 1,
                          name: product.name,
                          image: product.images[0],
                          price: product.price,
                        },
                      ],
                    },
                  })
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="text-red-600 font-semibold">Product not found</div>
      )}
    </div>
  )
}