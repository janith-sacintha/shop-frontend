import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [keyword, setKeyword] = useState("");   // fixed typo: setKeywod -> setKeyword
    const navigate = useNavigate();              // v6 way to navigate

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page refresh
        if (keyword.trim()) {
            navigate(`/products/search/${keyword}`);   // ✅ replaced history.push
        } else {
            navigate("/products");                     // ✅ replaced history.push
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex items-center ml-6 bg-white rounded-lg shadow-md px-2"
        >
            <input
                type="text"
                onChange={(e) => setKeyword(e.target.value)}   // fixed setQuery -> setKeyword
                placeholder="Search products..."
                className="
                    w-[200px] px-3 py-2 rounded-lg
                    text-black
                    placeholder-gray-400
                    focus:outline-none
                "
            />
            <button 
                type="submit" 
                className="p-2 text-blue-500 hover:text-blue-700 transition"
            >
                <BiSearch className="text-xl cursor-pointer" />
            </button>
        </form>
    );
}
