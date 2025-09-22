import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import Loader from "../../components/loader";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ text: "", rating: 5 });
  const [editing, setEditing] = useState({}); // key: reviewId -> { text, rating }
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");
  const currentUserId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  const fetchReviews = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/website-reviews");
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
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
      console.error(err);
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
      console.error(err);
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
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete review");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 space-y-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 text-center">Website Reviews</h1>

        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <textarea
            rows={3}
            placeholder="Write your review..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={newReview.text}
            onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
          />
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={20}
                className={`cursor-pointer ${newReview.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                onClick={() => setNewReview({ ...newReview, rating: star })}
              />
            ))}
          </div>
          <button
            onClick={submitReview}
            disabled={submitting}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-50"
          >
            Submit Review
          </button>
        </div>

        <div className="space-y-4">
          {reviews.length === 0 && <p className="text-center text-gray-500">No reviews yet.</p>}

          {reviews.map((r) => {
            const isOwner = r.user._id === currentUserId;
            const isEditing = editing[r._id] != null;

            return (
              <div key={r._id} className="bg-white rounded-xl p-4 shadow flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
                      {r.user.firstName[0]}
                    </div>
                    <span className="font-semibold text-gray-800">
                      {r.user.firstName} {r.user.lastName}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={16}
                      className={`${
                        isEditing ? (editing[r._id].rating >= star ? "text-yellow-400" : "text-gray-300")
                        : (r.rating >= star ? "text-yellow-400" : "text-gray-300")
                      }`}
                      onClick={() => {
                        if (isEditing) setEditing((prev) => ({ ...prev, [r._id]: { ...prev[r._id], rating: star } }));
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
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ) : (
                  <p className="text-gray-700">{r.text}</p>
                )}

                {isOwner && (
                  <div className="flex gap-2 mt-2">
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
                          className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition"
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
