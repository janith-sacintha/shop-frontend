import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Loader from "../../components/loader"
import { ArrowLeft } from "lucide-react"

export default function ReviewsPage() {
  const { productId } = useParams()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + `/api/reviews/${productId}`)
      .then((res) => {
        setReviews(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [productId])

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 bg-white rounded-2xl shadow-xl p-8">
        {/* Back Button */}
        <Link
          to="/reviews"
          className="flex items-center gap-2 mb-6 text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          <ArrowLeft size={18} /> Back to Delivered Products
        </Link>

        <h1 className="text-3xl font-extrabold text-indigo-700 mb-10 text-center">
          Reviews for Product {productId}
        </h1>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-600">No reviews yet for this product.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-50 rounded-xl p-5 shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-gray-800">{review.user}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
