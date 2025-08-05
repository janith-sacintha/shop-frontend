import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function ProductsAdminPage(){
    const [products , setProducts] = useState([])
    const [isLoading , setIsLoading] = useState(true)
    //const [a , setA] = useState(0)
    
    useEffect(
        ()=>{   
            if(isLoading){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                    (res)=>{
                        setProducts(res.data)
                        setIsLoading(false)
                    }
            )
        }
        
        },
        [isLoading]
    )

    const navigate = useNavigate()

    return(
        <div className="w-full h-full border">
            {isLoading? <Loader/> : <table>
                <thead>
                    <tr>
                        <th className="p-[10px]">Image</th>
                        <th>Product ID</th>
                        <th className="p-[10px]">Name</th>
                        <th className="p-[10px]">Price</th>
                        <th className="p-[10px]">Labelled price</th>
                        <th className="p-[10px]">Category</th>
                        <th className="p-[10px]">Stock</th>
                        <th className="p-[10px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(
                            (product , index)=>{
                                return(
                                    <tr key={index}>
                                        <td className="p-[10px]">
                                            <img src={product.images[0]} alt={product.name} className="w-[50px] h-[50px] object-cover" />
                                        </td>
                                        <td>{product.productId}</td>
                                        <td className="p-[10px]">{product.name}</td>
                                        <td className="p-[10px]">{product.price}</td>
                                        <td className="p-[10px]">{product.labelledPrice}</td>
                                        <td className="p-[10px]">{product.category}</td>
                                        <td className="p-[10px]">{product.stock}</td>
                                        <td className="p-[10px] flex justify-center items-center">
                                            <BiTrash className="bg-red-500 text-white text-3xl p-[7px] rounded-full cursor-pointer" onClick={
                                                ()=>{
                                                    const token = localStorage.getItem("token")
                                                    if(token == null){
                                                        toast.error("Please login first")
                                                        navigate("/login")
                                                        return;
                                                    }
                                                    axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/products/"+product.productId , {
                                                        headers : {
                                                            Authorization : "Bearer "+token
                                                        }
                                                    }).then(
                                                        (res)=>{
                                                            console.log(res)
                                                            toast.success("Product deleted successfully")
                                                            console.log("producy was deleted")
                                                            setIsLoading(!isLoading)
                                                        }
                                                    ).catch(
                                                        (error)=>{
                                                            console.log(error)
                                                            toast.error("Failed to delete the product")
                                                        }
                                                    )
                                                }
                                            }/>
                                            <BiEdit onClick={
                                                ()=>{
                                                    navigate("/admin/updateProduct" ,
                                                        {
                                                            state : product
                                                        }
                                                    )
                                                }
                                            } className="bg-blue-400 text-white text-3xl p-[7px] rounded-full cursor-pointer ml-[10px]"/>
                                        </td>
                                    </tr>
                                )
                            }
                        )         
                    }
                </tbody>
            </table>}
            <Link to="/admin/newProduct" className="fixed bottom-[60px] right-[60px] rounded-3xl bg-green-900 text-white p-[20px] shadow-2xl">
                <BiPlus className="text-3xl "/>
            </Link>
        </div>
    )
}