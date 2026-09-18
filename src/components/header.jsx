import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiCart, BiShoppingBag, BiUser, BiX } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuLogIn, LuLogOut } from "react-icons/lu";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Reviews", to: "/reviews" },
  { label: "About Us", to: "/about-us" },
  { label: "Contact Us", to: "/contact-us" },
];

export default function Header({ cartCount = 0 }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Lock body scroll while the mobile drawer is open, and let Escape close it.
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isDrawerOpen]);

  const goTo = (path) => {
    setIsDrawerOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsDrawerOpen(false);
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `relative py-1 transition-colors hover:text-white ${
      isActive ? "text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-white" : "text-white/80"
    }`;

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-20 sm:gap-4 sm:px-6 lg:px-8">
        {/* Left: hamburger (mobile) + logo */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={isDrawerOpen}
            onClick={() => setIsDrawerOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 transition hover:bg-white/25 md:hidden"
          >
            <GiHamburgerMenu size={20} />
          </button>

          <Link
            to="/"
            className="shrink-0 text-xl font-extrabold tracking-wide transition hover:text-yellow-300 sm:text-2xl"
          >
            Itoya
          </Link>
        </div>

        {/* Center: desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-6 font-medium md:flex lg:gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">

          <Link
            to="/my-orders"
            aria-label="My orders"
            className="flex items-center gap-2 rounded-lg bg-yellow-400 px-3 py-2 font-semibold text-blue-800 transition hover:bg-yellow-300 sm:px-4"
          >
            <BiShoppingBag size={20} />
            <span className="hidden sm:inline">My Orders</span>
          </Link>

          <Link
            to="/cart"
            aria-label={`Cart${cartCount ? `, ${cartCount} items` : ""}`}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-blue-800 transition hover:bg-yellow-300 sm:h-10 sm:w-10"
          >
            <BiCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold leading-none text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {token ? (
            <button
              type="button"
              aria-label="Log out"
              onClick={handleLogout}
              className="flex h-9 w-9 items-center justify-center gap-2 rounded-full bg-red-500 font-semibold text-white transition hover:bg-red-400 sm:h-auto sm:w-auto sm:rounded-lg sm:px-4 sm:py-2"
            >
              <LuLogOut size={19} />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          ) : (
            <Link
              to="/login"
              aria-label="Log in"
              className="flex h-9 w-9 items-center justify-center gap-2 rounded-full bg-white/15 font-semibold text-white transition hover:bg-white/25 sm:h-auto sm:w-auto sm:rounded-lg sm:px-4 sm:py-2"
            >
              <LuLogIn size={19} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed left-0 top-0 z-50 flex h-screen w-72 max-w-[85%] flex-col bg-gradient-to-b from-orange-500 to-orange-400 md:hidden"
          >
            <div className="flex items-center justify-between p-6">
              <span className="text-2xl font-extrabold">Itoya</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsDrawerOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 transition hover:bg-white/25"
              >
                <BiX size={22} />
              </button>
            </div>

            <nav className="flex flex-col gap-2 overflow-y-auto px-4 text-lg font-semibold">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.to}
                  type="button"
                  className="rounded-lg bg-white/10 p-3 text-left transition hover:bg-white/20"
                  onClick={() => goTo(link.to)}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-2 p-4 text-base font-semibold">
              {!token && (
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg bg-white/10 p-3 text-left transition hover:bg-white/20"
                  onClick={() => goTo("/register")}
                >
                  <BiUser size={20} /> Create account
                </button>
              )}
              {token ? (
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg bg-red-500 p-3 text-left transition hover:bg-red-400"
                  onClick={handleLogout}
                >
                  <LuLogOut size={20} /> Log Out
                </button>
              ) : (
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg bg-white/10 p-3 text-left transition hover:bg-white/20"
                  onClick={() => goTo("/login")}
                >
                  <LuLogIn size={20} /> Login
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}