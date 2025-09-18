import React from "react"
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi"
import { Link } from "react-router-dom"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-900 flex items-center justify-center px-6 py-12">
      <main className="w-full max-w-6xl">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-sm">
            About Us
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Learn more about itoya and what makes us your trusted neighbourhood
            store.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
              Who We Are
            </h2>
            <p className="text-gray-700 leading-relaxed">
              itoya is a locally-owned shop in Colombo, dedicated to serving
              students, professionals, and families with a wide variety of
              products and services. From everyday stationery and office
              supplies to vibrant toys, decorating items, and plastic essentials,
              we are committed to making your shopping simple and enjoyable.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
              What We Offer
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Stationery, office supplies, and art materials</li>
              <li>Fast and reliable photocopy & colour printing services</li>
              <li>Plastic items for storage, organization, and daily use</li>
              <li>Educational and fun toys for all ages</li>
              <li>Decorating items for events, parties, and celebrations</li>
            </ul>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to provide affordable, high-quality products and
              quick services under one roof. We believe in supporting our
              community by offering friendly service and reliable solutions
              every day.
            </p>
          </div>
        </section>

        <section className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600">
            Contact Us
          </h2>
          <div className="space-y-4 text-gray-700">
            <Link
              className="flex justify-center items-center gap-3 text-indigo-600 hover:underline"
              target="_blank"
              to="https://www.google.com/maps/dir//202%2FA%2F3+Parakatawella+-+Sikurapotha+Rd,+Pilimathalawa+20450/"
            >
              <FiMapPin className="text-xl" /> 202/A/3 Parakatawella -
              Sikurapotha Rd, Pilimathalawa
            </Link>
            <p className="flex justify-center items-center gap-3">
              <FiPhone className="text-xl text-indigo-600" /> +94 70 317 6321
            </p>
            <p className="flex justify-center items-center gap-3">
              <FiMail className="text-xl text-indigo-600" />{" "}
              itoyaparakatawella@gmail.com
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
