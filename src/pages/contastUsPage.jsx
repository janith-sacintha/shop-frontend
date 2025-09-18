import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"

export default function ContactUsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [text, setText] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setName(res.data.name.firstName+"-"+res.data.name.lastName)
        setEmail(res.data.email)
      })
      .catch(() => {})
  }, [navigate])

  function sendMessage(e) {
    e.preventDefault()

    if (!name || !email || !text) {
      toast.error("Please fill in all details before sending the message")
      return
    }

    const token = localStorage.getItem("token")
    const message = { name, email, message: text }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/contact-us", message, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        toast.success("Message sent successfully")
        navigate("/")
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong")
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center px-4 py-12">
      <main className="w-full max-w-5xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-sm">
            Contact Us
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            We’d love to hear from you. Reach out anytime!
          </p>
        </header>

        {/* Contact Info */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Link
            to="https://www.google.com/maps/dir//202%2FA%2F3+Parakatawella+-+Sikurapotha+Rd,+Pilimathalawa+20450/"
            target="_blank"
            className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 text-center"
          >
            <FiMapPin className="mx-auto text-4xl text-indigo-600" />
            <h3 className="mt-4 font-semibold text-gray-800 text-lg">
              Our Address
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              202/A/3 Parakatawella - Sikurapotha Rd, Pilimathalawa
            </p>
          </Link>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 text-center">
            <FiPhone className="mx-auto text-4xl text-indigo-600" />
            <h3 className="mt-4 font-semibold text-gray-800 text-lg">Phone</h3>
            <p className="mt-2 text-gray-600 text-sm">+94 70 317 6321</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 text-center">
            <FiMail className="mx-auto text-4xl text-indigo-600" />
            <h3 className="mt-4 font-semibold text-gray-800 text-lg">Email</h3>
            <p className="mt-2 text-gray-600 text-sm">
              itoyaparakatawella@gmail.com
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Send Us a Message
          </h2>
          <form className="grid grid-cols-1 gap-6" onSubmit={sendMessage}>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Message
              </label>
              <textarea
                rows="5"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Type your message here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5 transition"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
