import { BiCart, BiShoppingBag, BiUser } from "react-icons/bi"
import { GiHamburgerMenu } from "react-icons/gi"
import { HiX } from "react-icons/hi"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Reviews", to: "/reviews" },
  { label: "About Us", to: "/about-us" },
  { label: "Contact Us", to: "/contact-us" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <header className="h-16 md:h-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white sticky top-0 z-30 shadow-lg p-[20px]">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">

        {/* Left: hamburger (mobile) + logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md bg-white/15 hover:bg-white/25 transition"
          >
            <GiHamburgerMenu size={20} />
          </button>

          <Link
            to="/"
            className="text-xl sm:text-2xl font-extrabold tracking-wide hover:text-yellow-300 transition"
          >
            Itoya
          </Link>
        </div>

        {/* Center: desktop nav */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-lg">
          {NAV_LINKS.filter((l) => l.to !== "/").map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-yellow-200 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            to="/register"
            aria-label="Account"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white text-orange-600 hover:bg-yellow-200 transition"
          >
            <BiUser size={20} />
          </Link>

          <Link
            to="/my-orders"
            className="flex items-center gap-2 bg-yellow-400 text-blue-800 font-semibold px-3 py-2 sm:px-4 rounded-lg hover:bg-yellow-300 transition"
          >
            <BiShoppingBag size={20} />
            <span className="hidden sm:inline">My Orders</span>
          </Link>

          <Link
            to="/cart"
            aria-label="Cart"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-yellow-400 text-blue-800 hover:bg-yellow-300 transition"
          >
            <BiCart size={20} />
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 h-screen w-72 max-w-[85%] bg-gradient-to-b from-orange-500 to-orange-400 z-50 md:hidden flex flex-col">
            <div className="flex items-center justify-between p-6">
              <span className="text-3xl font-extrabold">Itoya</span>
              <button
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-md bg-white/15 hover:bg-white/25 transition"
              >
                <HiX size={22} />
              </button>
            </div>

            <nav className="flex flex-col gap-3 px-6 text-lg font-semibold overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.to}
                  className="hover:text-yellow-200 transition bg-white/10 p-3 rounded-lg text-left"
                  onClick={() => goTo(link.to)}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  )
}