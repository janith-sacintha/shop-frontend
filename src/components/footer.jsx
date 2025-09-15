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
                <Link className="flex gap-2 items-center text-purple-500" target="_blank" to="https://www.google.com/maps/dir//202%2FA%2F3+Parakatawella+-+Sikurapotha+Rd,+Pilimathalawa+20450/@6.9218387,79.8562055,11z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ae36b8beab1a6cf:0x30ba00911ec3499d!2m2!1d80.5420576!2d7.2772226?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D">
                  <FiMapPin /> 202/A/3 Parakatawella - Sikurapotha Rd, Pilimathalawa
                </Link>
              </div>
            </div>

            <div className="flex gap-6">
              <div>
                <h6 className="font-semibold">Help</h6>
                <ul className="mt-2 text-sm text-gray-600">
                  <li><Link to="/contact-us" className="hover:underline">Contact Us</Link></li>
                  <li className="mt-1"><Link to="/contact-us" className="hover:underline">FAQ</Link></li>
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