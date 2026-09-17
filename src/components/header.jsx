import { BiCart, BiShoppingBag, BiUser } from "react-icons/bi"
import { GiHamburgerMenu } from "react-icons/gi"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="h-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white sticky top-0 z-30 shadow-lg">

      {isOpen && (
        <div className="w-[95%] h-screen fixed top-0 left-0 bg-gradient-to-r from-orange-500 to-orange-400 z-40">
          <div className="w-[90%]  text-white p-8 flex flex-col gap-6 text-5xl font-extrabold">
            Itoya
          </div>
          <div className="flex flex-col gap-6 text-white p-8 text-xl font-semibold">
            <button 
              className="hover:text-yellow-200 transition bg-white/10 p-2 rounded-lg text-left"
              onClick={()=>{
                setIsOpen(false);
                navigate("/products");
                }}
              >Products</button>

            <button className="hover:text-yellow-200 transition bg-white/10 p-2 rounded-lg text-left" onClick={()=>{
              setIsOpen(false);
              navigate("/reviews");
            }}>
              Reviews
            </button>
            <button className="hover:text-yellow-200 transition bg-white/10 p-2 rounded-lg text-left" onClick={()=>{
              setIsOpen(false);
              navigate("/about-us");
            }}>
              About Us
            </button>
            <button className="hover:text-yellow-200 transition bg-white/10 p-2 rounded-lg text-left" onClick={()=>{
              setIsOpen(false);
              navigate("/contact-us");
            }}>
              Contact Us
            </button>

          </div>
        </div>
      )}
        
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8">
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide hover:text-yellow-300 transition"
          >
            itoya
          </Link>
          <nav className="hidden md:flex gap-6 font-medium text-lg">
            <Link
              to="/products"
              className="hover:text-yellow-200 transition"
            >
              Products
            </Link>
            <Link
              to="/reviews"
              className="hover:text-yellow-200 transition"
            >
              Reviews
            </Link>
            <Link
              to="/about-us"
              className="hover:text-yellow-200 transition"
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="hover:text-yellow-200 transition"
            >
              Contact Us
            </Link>
          </nav>
        </div>
        

        <div className="flex items-center justify-center gap-6 w-full md:w-[30%]">
          <GiHamburgerMenu size={32} onClick={()=> {setIsOpen(true)}} className="text-4xl bg-red-500 p-[2px] rounded-md shrink-0 md:hidden"/>

          <Link
            to="/register"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-orange-600 hover:bg-yellow-200 transition"
          >
            <BiUser size={22} />
          </Link>

          <Link
            to="/my-orders"
            className="flex items-center gap-2 bg-yellow-400 text-blue-800 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            <span>My Orders</span>
            <BiShoppingBag size={22} />
          </Link>

          <Link
            to="/cart"
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-blue-800 hover:bg-yellow-300 transition"
          >
            <BiCart size={22} />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
