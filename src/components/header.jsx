import { Link } from "react-router-dom";

export default function Header () {
    return (
        <header className="h-[100px] text-white bg-blue-500 flex justify-center items-center">
            <Link className="text-xl ml-4 font-bold" to="/">Home</Link>  
            <Link className="text-xl ml-4 font-bold" to="/products">Products</Link>
            <Link className="text-xl ml-4 font-bold" to="/reviews">Reviews</Link> 
            <Link className="text-xl ml-4 font-bold" to="/about-us">About Us</Link>   
            <Link className="text-xl ml-4 font-bold" to="/contact-us">Contact Us</Link>  
        </header>
    )
}