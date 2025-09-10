import React from "react"
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-600">About Us</h1>
          <p className="mt-3 text-lg text-gray-700">
            Learn more about itoya and what makes us your trusted neighbourhood store.
          </p>
        </header>

        {/* Who We Are */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            itoya is a locally-owned shop in Colombo, dedicated to serving students,
            professionals, and families with a wide variety of products and services.
            From everyday stationery and office supplies to vibrant toys, decorating
            items, and plastic essentials, we are committed to making your shopping
            simple and enjoyable.
          </p>
        </section>

        {/* What We Offer */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Stationery, office supplies, and art materials</li>
            <li>Fast and reliable photocopy & colour printing services</li>
            <li>Plastic items for storage, organization, and daily use</li>
            <li>Educational and fun toys for all ages</li>
            <li>Decorating items for events, parties, and celebrations</li>
          </ul>
        </section>

        {/* Our Mission */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to provide affordable, high-quality products and quick
            services under one roof. We believe in supporting our community by offering
            friendly service and reliable solutions every day.
          </p>
        </section>

        {/* Contact Info */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <div className="space-y-3 text-gray-700">
            <p className="flex items-center gap-2">
              <FiMapPin /> 123 Main Street, Colombo
            </p>
            <p className="flex items-center gap-2">
              <FiPhone /> +94 77 123 4567
            </p>
            <p className="flex items-center gap-2">
              <FiMail /> info@itoya.lk
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
