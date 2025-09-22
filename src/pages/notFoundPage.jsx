import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-9xl font-extrabold text-orange-500">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-800">Page Not Found</h2>
      <p className="mt-2 text-gray-600 text-center max-w-md">
        Sorry, the page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
      >
        <FiArrowLeft className="mr-2" /> Go Back Home
      </Link>
    </div>
  );
}
