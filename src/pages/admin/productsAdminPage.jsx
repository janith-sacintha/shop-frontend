import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function ProductsAdminPage(){
    return(
        <div className="w-full h-full border">
            <Link to="/admin/newProduct" className="fixed bottom-[60px] right-[60px] rounded-3xl bg-green-900 text-white p-[20px] shadow-2xl">
                <BiPlus className="text-3xl "/>
            </Link>
        </div>
    )
}