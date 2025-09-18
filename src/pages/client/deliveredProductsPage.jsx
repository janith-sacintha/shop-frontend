import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import Loader from "../../components/loader"
import { Send, MessageCircle } from "lucide-react"

export default function DeliveredProductsPage() {
  const [deliveredOrders, setDeliveredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState({})
  const [submittedProducts, setSubmittedProducts] = useState(new Set())
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const delivered = res.data.filter(
          (order) => order.status.toLowerCase() === "delivered"
        )
        setDeliveredOrders(delivered)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        toast.error("Failed to fetch delivered orders")
      })
  }, [])

  const handleReviewChange = (productId, text) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: text,
    }))
  }

  const submitReview = async (productId) => {
    if (!reviews[productId]) {
      toast.error("Please write a review before submitting")
      return
    }

    try {
      setSubmitting(true)
      const token = localStorage.getItem("token")
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + `/api/reviews/${productId}`,
        { text: reviews[productId] },
        { headers: { Authorization: "Bearer " + token } }
      )
      toast.success("Review submitted!")
      setSubmittedProducts((prev) => new Set(prev).add(productId))
      setReviews((prev) => ({ ...prev, [productId]: "" }))
    } catch (error) {
      console.log(error)
      toast.error("Failed to submit review")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 space-y-10">
        <h1 className="text-3xl font-extrabold text-indigo-700 text-center">
          Delivered Products
        </h1>

        {deliveredOrders.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No delivered products yet.
          </p>
        ) : (
          deliveredOrders.map((order) => (
            <div key={order.orderId} className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Order #{order.orderId}
              </h2>

              <div className="space-y-5">
                {order.items.map((item) => {
                  const isSubmitted = submittedProducts.has(item.productId)
                  return (
                    <div
                      key={item.productId}
                      className="flex flex-col md:flex-row items-start md:items-center gap-5 bg-white rounded-2xl p-5 shadow-md border border-gray-200 transition hover:shadow-xl"
                    >
                      {/* Product Info */}
                      <div className="flex items-center gap-5 flex-1">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover border border-indigo-400"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                        </div>
                      </div>

                      {/* Review Section */}
                      <div className="flex-1 w-full flex flex-col gap-2">
                        <textarea
                          rows="2"
                          placeholder={
                            isSubmitted
                              ? "Review submitted"
                              : "Write your review..."
                          }
                          value={reviews[item.productId] || ""}
                          onChange={(e) =>
                            handleReviewChange(item.productId, e.target.value)
                          }
                          disabled={isSubmitted}
                          className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-3 text-sm disabled:bg-gray-100 disabled:text-gray-400"
                        />

                        <div className="flex gap-2">
                          <button
                            onClick={() => submitReview(item.productId)}
                            disabled={submitting || isSubmitted}
                            className="flex-1 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-50"
                          >
                            <Send size={16} />
                            {submitting
                              ? "Submitting..."
                              : isSubmitted
                              ? "Submitted"
                              : "Submit Review"}
                          </button>

                          <button
                            onClick={() => navigate(`/reviews/${item.productId}`)}
                            className="flex-1 flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition"
                          >
                            <MessageCircle size={16} />
                            View Reviews
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
