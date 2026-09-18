import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { BiChat, BiSolidMessageSquareError } from "react-icons/bi";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { MdSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductAdminPage from "./admin/addProductAdminPage";
import UpdateProductPage from "./admin/updateProduct";
import OrdersPage from "./admin/odersPage";
import AdminChatPanel from "./admin/chatsPage";
import UpdateOrderPage from "./admin/orderUpdatePage";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import toast from "react-hot-toast";



export default function AdminPage(){
    const navigate = useNavigate();
    const [adminValidated,setAdminValidated] = useState(false);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token == null){  
            toast.error("You are not authorized to access this page");
            navigate("/login");
        }else{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/",{
                headers:{
                    Authorization: `Bearer ${token}`
                }})
            .then((res)=>{
                if(res.data.role == "admin"){
                    setAdminValidated(true);
                }else{
                    toast.error("You are not authorized to access this page");
                    navigate("/login");
                }
            }).catch((err)=>{
                toast.error("You are not authorized to access this page");
                navigate("/login");
            })
        }
    },[]);

    return(
        <div className="w-full h-screen flex">
            {adminValidated?<>
                <div className="w-[300px] h-screen flex flex-col items-center">
                    <span className="font-bold text-3xl my-5 text-purple-500">Admin Panel</span>
                    <Link className="flex items-center p-[25px] gap-[25px] text-2xl w-full h-[60px]" to="/admin/products"><GiShoppingBag/>Products</Link>
                    <Link className="flex items-center p-[25px] gap-[25px] text-2xl w-full h-[60px]" to="/admin/reviews"><BiSolidMessageSquareError/>Reviews</Link>
                    <Link className="flex items-center p-[25px] gap-[25px] text-2xl w-full h-[60px]" to="/admin/orders"><HiMiniShoppingCart/>Orders</Link>
                    <Link className="flex items-center p-[25px] gap-[25px] text-2xl w-full h-[60px]" to="/admin/users"><FaUser/>Users</Link>
                    <Link className="flex items-center p-[25px] gap-[25px] text-2xl w-full h-[60px]" to="/admin/chats"><BiChat/>Chats</Link>
                    <Link className="flex items-center p-[25px] gap-[25px] text-2xl w-full h-[60px]" to="/admin/setting"><MdSettings/>Setting</Link>


                </div>

                <div className="w-[calc(100%-300px)] h-full mt-[15px]">
                    <Routes path="/">
                        <Route path="/" element={<h1>Dashboard</h1>}/>
                        <Route path="/products" element={<ProductsAdminPage/>}/>
                        <Route path="/newProduct" element={<AddProductAdminPage/>}/>
                        <Route path="/updateProduct" element={<UpdateProductPage/>}></Route>
                        <Route path="/orders" element={<OrdersPage/>}/>
                        <Route path="/updateOrder" element={<UpdateOrderPage/>}/>
                        <Route path="/chats" element={<AdminChatPanel/>}/>
                        <Route path="/reviews" element={<h1>reviews</h1>}/>
                        <Route path="/users" element={<h1>Users</h1>}/>
                    </Routes>
                </div>
            </>:<Loader/>}
        </div>
    )
}