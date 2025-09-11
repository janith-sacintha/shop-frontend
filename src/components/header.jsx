import { BiCart, BiShoppingBag, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Header () {
    return (
        <header className="h-[100px] text-white bg-orange-500 flex justify-center items-center sticky top-0 z-30">
            <Link className="text-xl ml-4 font-bold" to="/">Home</Link>  
            <Link className="text-xl ml-4 font-bold" to="/products">Products</Link>
            <Link className="text-xl ml-4 font-bold" to="/reviews">Reviews</Link> 
            <Link className="text-xl ml-4 font-bold" to="/about-us">About Us</Link>   
            <Link className="text-xl ml-4 font-bold" to="/contact-us">Contact Us</Link>
            <Link className="absolute right-[350px] text-2xl font-bold bg-blue-800 w-[40px] h-[40px] flex items-center justify-center rounded-full" to="/register"><BiUser/></Link>
            <Link className="absolute right-[150px] text-lg flex bg-yellow-400 text-blue-700 font-bold rounded-xl p-[5px]" to="/my-orders"><span>My Orders</span><BiShoppingBag className="text-2xl ml-2 font-bold"/></Link>
            <Link className="absolute right-[80px] bg-yellow-400 text-blue-700 font-bold rounded-full h-[40px] w-[55px] flex items-center" to="/cart"><BiCart className="text-2xl ml-4 font-bold"/></Link>
        </header>
    )
}