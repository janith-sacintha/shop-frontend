import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Footer () {
    return(
        <footer className="mt-12 pb-12">
          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h6 className="font-bold">itoya</h6>
              <p className="text-sm text-gray-600 mt-1">Stationery • Photocopy • Colour print • Toys • Decorating</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-700">
                <FiMapPin /> 123 Main Street, Colombo
              </div>
            </div>

            <div className="flex gap-6">
              <div>
                <h6 className="font-semibold">Help</h6>
                <ul className="mt-2 text-sm text-gray-600">
                  <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
                  <li className="mt-1"><Link to="/faq" className="hover:underline">FAQ</Link></li>
                </ul>
              </div>

              <div>
                <h6 className="font-semibold">Opening</h6>
                <p className="text-sm text-gray-600 mt-2">Mon - Sat: 8:30am — 7:00pm</p>
              </div>
            </div>
          </div>
        </footer>
    )
}