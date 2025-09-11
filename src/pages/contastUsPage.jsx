import React from "react"
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi"

export default function ContactUsPage() {
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
            <p className="mt-1 text-gray-700">123 Main Street, Colombo</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FiPhone className="mx-auto text-2xl text-indigo-600" />
            <h3 className="mt-3 font-semibold">Phone</h3>
            <p className="mt-1 text-gray-700">+94 77 123 4567</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FiMail className="mx-auto text-2xl text-indigo-600" />
            <h3 className="mt-3 font-semibold">Email</h3>
            <p className="mt-1 text-gray-700">info@itoya.lk</p>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Send us a message</h2>
          <form className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your Name" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="you@example.com" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="5" placeholder="Type your message here..."></textarea>
            </div>

            <button type="submit" className="px-5 py-3 bg-indigo-600 text-white rounded-md font-medium hover:opacity-95">
              Send Message
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
