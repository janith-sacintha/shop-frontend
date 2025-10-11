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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 flex justify-center">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight">Website Reviews</h1>
          {averageRating && (
            <div className="flex justify-center items-center gap-2 text-yellow-500 text-2xl font-bold">
              <FaStar className="text-yellow-400" />
              <span>{averageRating}/5</span>
            </div>
          )}
        </div>

        {token ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5 border border-gray-100">
            <textarea
              rows={3}
              placeholder="Share your thoughts..."
              className="w-full border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            />
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={22}
                  className={`cursor-pointer ${newReview.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                />
              ))}
            </div>
            <button
              onClick={submitReview}
              disabled={submitting}
              className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">Please log in to leave a review.</p>
        )}

        <div className="space-y-5">
          {reviews.length === 0 && <p className="text-center text-gray-500">No reviews yet.</p>}

          {reviews.map((r) => {
            const isOwner = r.user._id === currentUserId;
            const isEditing = editing[r._id] != null;
            return (
              <div
                key={r._id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold text-lg">
                      {r.user.firstName[0]}
                    </div>
                    <span className="font-semibold text-gray-800 text-lg">
                      {r.user.firstName} {r.user.lastName}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={18}
                      className={`${
                        isEditing
                          ? editing[r._id].rating >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                          : r.rating >= star
                          ? "text-yellow-400"
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
                    className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{r.text}</p>
                )}

                {isOwner && (
                  <div className="flex gap-3 mt-4">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => updateReview(r._id)}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditing((prev) => ({ ...prev, [r._id]: null }))}
                          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditing((prev) => ({ ...prev, [r._id]: { text: r.text, rating: r.rating } }))}
                          className="flex-1 bg-yellow-400 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteReview(r._id)}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
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
