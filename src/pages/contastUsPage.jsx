import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

export default function ContactUsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [text, setText] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
      const token = localStorage.getItem("token")
      if (token == null) {
        navigate("/login")
        return;
      }
  
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          setName(res.data.name)
          setEmail(res.data.email)
        })
        .catch((error) => console.log(error))
    }, [navigate])


  function sendMessage(e) {
    e.preventDefault() // ✅ stop default form submission

    const message = { name, email, message: text }

    if (!name || !email || !text) {
      toast.error("Please fill in all details before send the message")
      return;
    }

    const token = localStorage.getItem("token")

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/contact-us", message, {
      headers: { Authorization: "Bearer " + token }
    })
      .then((res) => {
        console.log(res)
        toast.success("Message sent successfully")
        navigate("/")
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong")
        navigate("/")
      })
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-4xl mx-auto px-6 py-12">

        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-600">Contact Us</h1>
          <p className="mt-3 text-lg text-gray-700">
            We’d love to hear from you! Reach out using the details below.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FiMapPin className="mx-auto text-2xl text-indigo-600" />
            <h3 className="mt-3 font-semibold">Our Address</h3>
            <p className="mt-1 text-gray-700">No 504 Parakatawella, Pilimathalawa</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FiPhone className="mx-auto text-2xl text-indigo-600" />
            <h3 className="mt-3 font-semibold">Phone</h3>
            <p className="mt-1 text-gray-700">+94 70 317 6321</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FiMail className="mx-auto text-2xl text-indigo-600" />
            <h3 className="mt-3 font-semibold">Email</h3>
            <p className="mt-1 text-gray-700">itoyaparakatawella@gmail.com</p>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Send us a message</h2>
          <form className="grid grid-cols-1 gap-6" onSubmit={sendMessage}>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="5"
                placeholder="Type your message here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="px-5 py-3 bg-indigo-600 text-white rounded-md font-medium hover:opacity-95"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
