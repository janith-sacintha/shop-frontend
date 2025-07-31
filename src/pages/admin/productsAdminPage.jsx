import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

const sampleProducts = [
    {
        productId: "COS001",
        name: "HydraGlow Moisturizer",
        altNames: ["Hydrating Glow Cream", "Daily Moisture Boost"],
        labelledPrice: 3200,
        price: 2800,
        images: ["/images/hydraglow.jpg"],
        description: "A lightweight moisturizer that hydrates and imparts a natural glow. Suitable for all skin types.",
        stock: 50,
        isAvailable: true,
        category: "cosmetics"
    },
    {
        productId: "COS002",
        name: "Velvet Matte Lipstick - Crimson Kiss",
        altNames: ["Red Matte Lipstick", "Crimson Velvet"],
        labelledPrice: 1800,
        price: 1500,
        images: ["/images/crimsonkiss.jpg"],
        description: "A richly pigmented matte lipstick that delivers long-lasting color with a velvety finish.",
        stock: 100,
        isAvailable: true,
        category: "cosmetics"
    },
    {
        productId: "COS003",
        name: "Luminous Foundation SPF 15",
        altNames: ["Radiant Skin Foundation", "Glow Base"],
        labelledPrice: 4500,
        price: 4000,
        images: ["/images/luminousfoundation.jpg"],
        description: "A buildable foundation that provides a luminous finish while protecting skin with SPF 15.",
        stock: 75,
        isAvailable: true,
        category: "cosmetics"
    },
    {
        productId: "COS004",
        name: "Silken Touch Compact Powder",
        altNames: ["Matte Finish Powder", "Oil-Control Compact"],
        labelledPrice: 2200,
        price: 2000,
        images: ["/images/silkentouch.jpg"],
        description: "A silky compact powder that sets makeup and controls shine for a flawless matte finish.",
        stock: 60,
        isAvailable: true,
        category: "cosmetics"
    },
    {
        productId: "COS005",
        name: "AquaFresh Facial Cleanser",
        altNames: ["Hydrating Face Wash", "Gentle Cleanser"],
        labelledPrice: 1600,
        price: 1400,
        images: ["/images/aquafreshcleanser.jpg"],
        description: "A gentle facial cleanser that removes impurities while maintaining skin's natural moisture balance.",
        stock: 80,
        isAvailable: true,
        category: "cosmetics"
    }
]
      


export default function ProductsAdminPage(){
    const [products , setProducts] = useState(sampleProducts)
    const [a , setA] = useState(0)
    
    useEffect(
        ()=>
        {
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                (res)=>{
                    setProducts(res.data)
                }
            )
        },
        [a]
    )

    const navigate = useNavigate()

    return(
        <div className="w-full h-full border">
            <table>
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
                                        <td className="p-[10px]">
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
                                                            setA(a+1);
                                                        }
                                                    ).catch(
                                                        (error)=>{
                                                            console.log(error)
                                                            toast.error("Failed to delete the product")
                                                        }
                                                    )
                                                }
                                            }/>
                                        </td>
                                    </tr>
                                )
                            }
                        )         
                    }
                </tbody>
            </table>
            <Link to="/admin/newProduct" className="fixed bottom-[60px] right-[60px] rounded-3xl bg-green-900 text-white p-[20px] shadow-2xl">
                <BiPlus className="text-3xl "/>
            </Link>
        </div>
    )
}