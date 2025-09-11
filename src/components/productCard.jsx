import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/overview/${product.productId}`}
      className="group relative flex flex-col w-72 h-[420px] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
    >

      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
        />
        {product.labelledPrice > product.price && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            Sale
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between p-4">
        <div>
          <span className="text-xs text-gray-400">{product.productId}</span>
          <h2 className="text-lg font-bold mt-1 text-gray-900 line-clamp-1">
            {product.name}
          </h2>
        </div>

        <div className="mt-2">
          {product.labelledPrice > product.price ? (
            <div className="flex items-center gap-2">
              <span className="line-through text-sm text-gray-400">
                Rs. {product.labelledPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-lg font-semibold text-indigo-600">
                Rs.{" "}
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          ) : (
            <span className="text-lg font-semibold text-gray-900">
              Rs.{" "}
              {product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
