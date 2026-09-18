import { Link } from "react-router-dom"
import { FiShoppingCart, FiArrowRight } from "react-icons/fi"

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white text-gray-900 overflow-hidden">
      <main className="relative max-w-6xl mx-auto px-6 py-20 sm:py-28">

        {/* Decorative background blobs */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-40 -left-32 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl" />

        {/* Hero */}
        <section className="relative grid grid-cols-1 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-wide uppercase">
              Your local one-stop shop
            </span>

            <h2 className="mt-5 text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                itoya
              </span>
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-md">
              Stationery, fast photocopy and colour printing, plastics, toys
              and decorating items — quality products with friendly service,
              right in your neighbourhood.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gray-900 text-white font-semibold shadow-lg shadow-gray-900/10 hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <FiShoppingCart className="text-lg" />
                Shop Now
                <FiArrowRight className="text-lg transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </section>

        <div className="mt-24">
        </div>
      </main>
    </div>
  )
}