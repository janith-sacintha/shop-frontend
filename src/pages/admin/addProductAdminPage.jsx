import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function AddProductAdminPage(){

    const [productId , setProductId] = useState("")
    const [productName , setProductName] = useState("")
    const [alternativeNames , setAlternativeNames] = useState("")
    const [labelledPrice , setLabelledPrice] = useState("")
    const [price , setPrice] = useState("")
    const [images , setImages] = useState("")
    const [description , setDescription] = useState("")
    const [stock , setStock] = useState("")
    const [isAvailable , setIsAvailable] = useState(true)
    const [category , setCategory] = useState("cream")

    const navigate = useNavigate()

    function handleSubmit(){
        const altNamesArray = alternativeNames.split(",")

        const productData = {
            productId : productId,
            name : productName,
            altNames : altNamesArray,
            labelledPrice : labelledPrice,
            price : price,
            images : [images],
            description : description,
            stock : stock,
            isAvailable : isAvailable,
            category : category
        }
        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please login")
            navigate("/login")
            return;
        }

        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/products" ,productData , 
            {
                headers : {
                    Authorization : "Bearer "+token
                }
            }

        ).then(
            (response)=>{
                console.log(response.data)
                toast.success("Product created successfully")
                navigate("/admin/products")
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("Failed to create the product")
                navigate("/admin/newProuct")
            }
        )
    }


    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[600px] border rounded-xl flex flex-wrap justify-between items-center p-[40px]">
                <div className="flex flex-col w-[200px] gap-[5px]">
                    <label className="text-sm font-semibold">Product ID</label>
                    <input type="text" value={productId} onChange={(e)=>{setProductId(e.target.value)}} className="h-[40px] border rounded-md"/>
                </div>
                <div className="flex flex-col w-[300px] gap-[5px]">
                    <label className="text-sm font-semibold">Product Name</label>
                    <input type="text" value={productName} onChange={(e)=>{setProductName(e.target.value)}} className="h-[40px] border rounded-md"/>
                </div>
                <div className="flex flex-col w-[500px] gap-[5px]">
                    <label className="text-sm font-semibold">Alternative Names</label>
                    <input type="text" value={alternativeNames} onChange={(e)=>{setAlternativeNames(e.target.value)}} className="h-[40px] border rounded-md"/>
                </div>
                <div className="flex flex-col w-[200px] gap-[5px]">
                    <label className="text-sm font-semibold">Labelled Price</label>
                    <input type="number" value={labelledPrice} onChange={(e)=>{setLabelledPrice(e.target.value)}} className="h-[40px] border rounded-md"/>
                </div>
                <div className="flex flex-col w-[200px] gap-[5px]">
                    <label className="text-sm font-semibold">Price</label>
                    <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} className="h-[40px] border rounded-md"/>
                </div>
                <div className="flex flex-col w-[500px] gap-[5px]">
                    <label className="text-sm font-semibold">Images</label>
                    <input type="text" value={images} onChange={(e)=>{setImages(e.target.value)}} className="h-[40px] border rounded-md"/>
                </div>
                <div className="flex flex-col w-[500px] h-[100px] gap-[5px]">
                    <label className="text-sm font-semibold">Description</label>
                    <textarea type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} className="h-[40px] border rounded-md"></textarea>
                </div>
                <div className="flex flex-col w-[200px] gap-[5px]">
                    <label className="text-sm font-semibold">Stock</label>
                    <input type="number" value={stock} onChange={(e)=>{setStock(e.target.value)}} className="h-[40px] border rounded-md"/>
                </div>
                <div className="flex flex-col w-[200px] gap-[5px]">
                    <label className="text-sm font-semibold">Is Available</label>
                    <select value={isAvailable} className="h-[40px] border rounded-md" onChange={(e)=>{setIsAvailable(e.target.value)}}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="flex flex-col w-[200px] gap-[5px]">
                    <label className="text-sm font-semibold">Category</label>
                    <select value={category} className="h-[40px] border rounded-md" onChange={(e)=>{setCategory(e.target.value)}}>
                        <option value="cream">Cream</option>
                        <option value="face wash">Face Wash</option>
                        <option value="soap">Soap</option>
                        <option value="fragrance">Fragrance</option>
                    </select>
                </div>
                <div className="flex justify-around w-full py-[20px]">
                    <Link to={"/admin/products"} className="h-[50px] w-[200px] bg-red-950 text-white flex justify-center items-center rounded-md">Cancel</Link>
                    <button onClick={handleSubmit} className="h-[50px] w-[200px] bg-green-950 text-white rounded-md ml-[20px]">Add Product</button>
                </div>
            </div>
        </div>
    )
}