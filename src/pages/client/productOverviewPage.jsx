import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/loader"
import ImageSlider from "../../components/imageSlider"
import { addToCart } from "../../utils/cart"
import { AlertTriangle, MessageSquare } from "lucide-react"

export default function ProductOverviewPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(true)
  const [showReviews, setShowReviews] = useState(false)
  const navigate = useNavigate()
  const [status, setStatus] = useState("loading")

  // Fetch product
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
  }, [status, params.productId])

  // Fetch reviews
  useEffect(() => {
    if (params.productId) {
      setLoadingReviews(true)
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/reviews/" + params.productId)
        .then((res) => {
          setReviews(res.data || [])
          setLoadingReviews(false)
        })
        .catch(() => {
          setLoadingReviews(false)
          toast.error("Failed to load reviews")
        })
    }
  }, [params.productId])

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50 py-12 px-6">
      {status === "loading" && <Loader />}

      {status === "success" && (
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
          {/* Product images */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
            <ImageSlider images={product.images} />
          </div>

          {/* Product details */}
          <div className="w-full md:w-1/2 flex flex-col px-10 py-8">
            <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight">
              {product.name}
            </h1>
            {product.altNames?.length > 0 && (
              <span className="text-sm text-orange-500 mt-2 font-medium">
                {product.altNames.join(" | ")}
              </span>
            )}

            <p className="mt-6 text-gray-600 leading-relaxed text-justify text-base">
              {product.description}
            </p>

            {/* Pricing */}
            <div className="mt-8">
              {product.labelledPrice > product.price ? (
                <div className="flex items-center gap-4">
                  <span className="line-through text-red-500 text-lg font-medium">
                    LKR {product.labelledPrice.toLocaleString("en-us")}
                  </span>
                  <span className="text-4xl text-green-700 font-extrabold">
                    LKR{" "}
                    {product.price.toLocaleString("en-us", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ) : (
                <span className="text-4xl text-green-700 font-extrabold">
                  LKR{" "}
                  {product.price.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <button
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-md hover:opacity-90 hover:scale-105 transition"
                onClick={() => {
                  addToCart(product, 1)
                  toast.success("Product added to cart")
                }}
              >
                Add to Cart
              </button>

              <button
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold shadow-md hover:opacity-90 hover:scale-105 transition"
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
        <div className="flex items-center gap-2 text-red-600 font-semibold text-lg">
          <AlertTriangle className="w-6 h-6" />
          Product not found
        </div>
      )}

      {/* Reviews Section */}
      <div className="w-full max-w-6xl mt-16">
        <div className="bg-white rounded-3xl shadow-xl p-10">
          {/* Header with toggle */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <MessageSquare className="w-7 h-7 text-indigo-500" />
              Customer Reviews ({reviews.length})
            </h2>
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="px-5 py-2 text-sm font-medium bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
            >
              {showReviews ? "Hide Reviews" : "Show Reviews"}
            </button>
          </div>

          {showReviews && (
            <>
              {loadingReviews ? (
                <Loader />
              ) : reviews.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="flex flex-col gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition bg-gradient-to-br from-gray-50 to-white"
                    >
                      {/* User Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white font-semibold text-lg shadow-md">
                          {review.user?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {review.user}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-600 leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No reviews yet. Be the first!
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
