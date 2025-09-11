import { Link } from "react-router-dom"
import { FiPhone, FiShoppingCart } from "react-icons/fi"
import Footer from "../components/footer"

export default function HomePage(){
  const categories = [
    {
      id: 'stationery',
      title: 'Stationery',
      desc: 'Pens, notebooks, folders, art supplies and everyday essentials.',
      cta: '/products/stationery'
    },
    {
      id: 'printing',
      title: 'Photocopy & Color Print',
      desc: 'High-quality B/W and color printing, scanning and binding services.',
      cta: '/services/printing'
    },
    {
      id: 'plastic',
      title: 'Plastic Items',
      desc: 'Storage boxes, organizers, folders and durable plastic supplies.',
      cta: '/products/plastic'
    },
    {
      id: 'toys',
      title: 'Toys',
      desc: 'Educational toys, puzzles, plushies and fun for all ages.',
      cta: '/products/toys'
    },
    {
      id: 'decor',
      title: 'Decorating Items',
      desc: 'Balloons, ribbons, party decor, and small home decorations.',
      cta: '/products/decor'
    }
  ]

  const features = [
    { title: 'Fast Printing', detail: 'Walk-in or send files — prints within minutes.' },
    { title: 'Bulk Discounts', detail: 'Special pricing for schools, offices and events.' },
    { title: 'Quality Guarantee', detail: 'Carefully checked prints and products.' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight">Welcome to <span className="text-indigo-600">itoya</span></h2>
            <p className="mt-4 text-lg text-gray-700">Your neighbourhood one-stop shop for stationery, fast photocopy and colour printing, plastics, toys and decorating items. Quality products, friendly service.</p>

            <div className="mt-6 flex gap-3">
              <Link to="/products" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-indigo-600 text-white font-medium shadow-sm hover:opacity-95">Shop Now <FiShoppingCart /></Link>
              <Link to="/services/printing" className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-gray-200 bg-white text-sm">Printing Services</Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((f)=> (
                <div key={f.title} className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold">{f.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{f.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-lg p-6 flex items-center justify-center">
            {/* Illustration placeholder */}
            <div className="w-full h-64 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
              <p className="text-center">Hero image / product collage</p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold">Browse categories</h3>
          <p className="text-gray-600 mt-1">Explore our most popular categories.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(cat => (
              <article key={cat.id} className="bg-white rounded-lg shadow-sm p-5 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-md bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">{cat.title.charAt(0)}</div>
                  <h4 className="mt-4 font-semibold text-lg">{cat.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">{cat.desc}</p>
                </div>

                <div className="mt-4">
                  <Link to={cat.cta} className="inline-block text-sm px-4 py-2 rounded-md border border-indigo-100 hover:bg-indigo-50">View {cat.title}</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Quick services */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="font-semibold">Photocopy & Printing</h5>
            <p className="text-sm text-gray-600 mt-2">A4/B5 colour and B/W, scanning, laminating and binding. Walk-ins welcome.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="font-semibold">Party & Decorating</h5>
            <p className="text-sm text-gray-600 mt-2">Balloons, ribbons, gift wrap and small decorative items for celebrations.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="font-semibold">Bulk Orders</h5>
            <p className="text-sm text-gray-600 mt-2">We handle school and office stationery lists — contact us for quotes.</p>
          </div>
        </section>

        {/* CTA strip */}
        <section className="mt-12 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between">
          <div>
            <h4 className="text-xl font-semibold">Need prints fast?</h4>
            <p className="mt-1 text-sm">Drop files at our store or upload online — same-day service available.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to="/services/printing" className="inline-block px-4 py-2 rounded-md bg-white text-indigo-600 font-medium">Upload Files</Link>
          </div>
        </section>

        {/* Footer */}
        <Footer/>
      </main>
    </div>
  )
}
