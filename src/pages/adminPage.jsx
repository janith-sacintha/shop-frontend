import { Link, Route, Routes } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { MdSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductAdminPage from "./admin/addProductAdminPage";
import UpdateProductPage from "./admin/updateProduct";

export default function AdminPage(){
    return(
        <div className="w-full h-screen flex">
            <div className="w-[300px] h-screen flex flex-col items-center">
                <span className="font-bold text-3xl my-5 text-purple-500">Admin Panel</span>
                <Link className="flex items-center p-[25px] gap-[25px] text-2xl w-full h-[60px]" to="/admin/products"><GiShoppingBag/>Products</Link>
                <Link className="flex items-center p-[25px] gap-[25px] text-2xl w-full h-[60px]" to="/admin/reviews"><BiSolidMessageSquareError/>Reviews</Link>
                <Link className="flex items-center p-[25px] gap-[25px] text-2xl w-full h-[60px]" to="/admin/oders"><HiMiniShoppingCart/>Oders</Link>
                <Link className="flex items-center p-[25px] gap-[25px] text-2xl w-full h-[60px]" to="/admin/users"><FaUser/>Users</Link>
                <Link className="flex items-center p-[25px] gap-[25px] text-2xl w-full h-[60px]" to="/admin/setting"><MdSettings/>Setting</Link>


            </div>

            <div className="w-[calc(100%-300px)] h-full mt-[15px]">
                <Routes path="/">
                    <Route path="/" element={<h1>Dashboard</h1>}/>
                    <Route path="/products" element={<ProductsAdminPage/>}/>
                    <Route path="/newProduct" element={<AddProductAdminPage/>}/>
                    <Route path="/updateProduct" element={<UpdateProductPage/>}></Route>
                    <Route path="/reviews" element={<h1>Reviews</h1>}/>
                    <Route path="/oders" element={<h1>Oders</h1>}/>
                    <Route path="/users" element={<h1>Users</h1>}/>
                    
                </Routes>
            </div>
        </div>
    )
}