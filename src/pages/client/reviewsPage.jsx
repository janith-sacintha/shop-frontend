import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import Loader from "../../components/loader";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ text: "", rating: 5 });
  const [editing, setEditing] = useState({});
  const [submitting, setSubmitting] = useState(false);

  let token = localStorage.getItem("token");
  let currentUserId = null;
  try {
    if (token) currentUserId = JSON.parse(atob(token.split(".")[1])).id;
  } catch {
    token = null;
    localStorage.removeItem("token");
  }

  const fetchReviews = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/website-reviews");
      setReviews(res.data);
      setLoading(false);
    } catch {
      toast.error("Failed to fetch reviews");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const submitReview = async () => {
    if (!newReview.text.trim()) return toast.error("Review cannot be empty");
    try {
      setSubmitting(true);
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/website-reviews",
        newReview,
        { headers: { Authorization: "Bearer " + token } }
      );
      setReviews([res.data, ...reviews]);
      setNewReview({ text: "", rating: 5 });
      toast.success("Review submitted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const updateReview = async (id) => {
    if (!editing[id].text.trim()) return toast.error("Review cannot be empty");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/website-reviews/${id}`,
        editing[id],
        { headers: { Authorization: "Bearer " + token } }
      );
      setReviews(reviews.map((r) => (r._id === id ? res.data : r)));
      setEditing((prev) => ({ ...prev, [id]: null }));
      toast.success("Review updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update review");
    }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/website-reviews/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setReviews(reviews.filter((r) => r._id !== id));
      toast.success("Review deleted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete review");
    }
  };

  if (loading) return <Loader />;

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-16 flex justify-center px-4">
      <div className="w-full max-w-3xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-indigo-700 tracking-tight drop-shadow-sm">
            Website Reviews
          </h1>
          <p className="text-gray-500 text-lg">See what people are saying about us</p>
          {averageRating && (
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-orange-100 px-5 py-2 rounded-full shadow-md">
              <FaStar className="text-orange-400" />
              <span className="text-indigo-700 font-bold text-xl">{averageRating}</span>
              <span className="text-gray-400 text-sm">/ 5</span>
            </div>
          )}
        </div>

        {/* Review form */}
        {token ? (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 space-y-6 border border-orange-100">
            <h2 className="text-xl font-bold text-indigo-700">Leave a review</h2>
            <textarea
              rows={3}
              placeholder="Share your thoughts..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition resize-none"
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            />
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={26}
                  className={`cursor-pointer transition-transform hover:scale-110 ${
                    newReview.rating >= star ? "text-orange-400" : "text-gray-300"
                  }`}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                />
              ))}
            </div>
            <button
              onClick={submitReview}
              disabled={submitting}
              className="w-full md:w-auto px-8 py-3 bg-orange-600 text-white font-semibold rounded-xl shadow-md hover:bg-orange-700 hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        ) : (
          <div className="bg-white/70 backdrop-blur-md border border-orange-100 rounded-3xl p-8 text-center shadow-md">
            <p className="text-gray-500 text-lg">Please log in to leave a review.</p>
          </div>
        )}

        {/* Reviews list */}
        <div className="space-y-6">
          {reviews.length === 0 && (
            <p className="text-center text-gray-500">No reviews yet.</p>
          )}

          {reviews.map((r) => {
            const isOwner = r.user._id === currentUserId;
            const isEditing = editing[r._id] != null;
            return (
              <div
                key={r._id}
                className="bg-white/90 backdrop-blur-md rounded-3xl p-7 shadow-md border border-orange-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                      {r.user.firstName[0]}
                    </div>
                    <span className="font-semibold text-indigo-700 text-lg">
                      {r.user.firstName} {r.user.lastName}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={18}
                      className={`${
                        isEditing
                          ? editing[r._id].rating >= star
                            ? "text-orange-400"
                            : "text-gray-300"
                          : r.rating >= star
                          ? "text-orange-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => {
                        if (isEditing)
                          setEditing((prev) => ({
                            ...prev,
                            [r._id]: { ...prev[r._id], rating: star },
                          }));
                      }}
                    />
                  ))}
                </div>

                {isEditing ? (
                  <textarea
                    rows={2}
                    value={editing[r._id].text}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, [r._id]: { ...prev[r._id], text: e.target.value } }))
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition resize-none"
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">{r.text}</p>
                )}

                {isOwner && (
                  <div className="flex gap-3 mt-5">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => updateReview(r._id)}
                          className="flex-1 bg-orange-600 text-white px-4 py-2.5 rounded-xl shadow-md hover:bg-orange-700 transition font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditing((prev) => ({ ...prev, [r._id]: null }))}
                          className="flex-1 bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl shadow-sm hover:bg-gray-200 transition font-medium"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditing((prev) => ({ ...prev, [r._id]: { text: r.text, rating: r.rating } }))}
                          className="flex-1 bg-orange-50 text-orange-700 border border-orange-200 px-4 py-2.5 rounded-xl hover:bg-orange-100 transition font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteReview(r._id)}
                          className="flex-1 bg-white text-red-500 border border-red-200 px-4 py-2.5 rounded-xl hover:bg-red-50 transition font-medium"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}