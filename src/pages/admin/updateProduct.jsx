import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload.jsx";

export default function UpdateProductPage(){
    const location = useLocation()

    const [productId , setProductId] = useState(location.state.productId)
    const [productName , setProductName] = useState(location.state.name)
    const [alternativeNames , setAlternativeNames] = useState(location.state.altNames.join(","))
    const [labelledPrice , setLabelledPrice] = useState(location.state.labelledPrice)
    const [price , setPrice] = useState(location.state.price)
    const [images , setImages] = useState([])
    const [description , setDescription] = useState(location.state.description)
    const [stock , setStock] = useState(location.state.stock)
    const [isAvailable , setIsAvailable] = useState(location.state.isAvailable)
    const [category , setCategory] = useState(location.state.category)

    const navigate = useNavigate()

    async function handleSubmit(){
        const promisesArray = []

        for (let i=0 ; i< images.length ; i++){
            const promise = uploadFile(images[i])
            promisesArray[i] = promise
        }

        const responses = await Promise.all(promisesArray)
        console.log(responses)
        
        const altNamesArray = alternativeNames.split(",")
        const productData = {
            productId : productId,
            name : productName,
            altNames : altNamesArray,
            labelledPrice : labelledPrice,
            price : price,
            images : responses,
            description : description,
            stock : stock,
            isAvailable : isAvailable,
            category : category
        }

        if(responses.length == 0){
            productData.images = location.state.images
        }

        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please login")
            navigate("/login")
            return;
        }

        axios.put(import.meta.env.VITE_BACKEND_URL+"/api/products/"+productId ,productData , 
            {
                headers : {
                    Authorization : "Bearer "+token
                }
            }

        ).then(
            (response)=>{
                console.log(location.state)
                toast.success("Product updated successfully")
                navigate("/admin/products")
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("Failed to update the product")
                navigate("/admin/products")
            }
        )
    }


    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[600px] border rounded-xl flex flex-wrap justify-between items-center p-[40px]">
                <div className="flex flex-col w-[200px] gap-[5px]">
                    <label className="text-sm font-semibold">Product ID</label>
                    <input disabled type="text" value={productId} onChange={(e)=>{setProductId(e.target.value)}} className="h-[40px] border rounded-md"/>
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
                    <input 
                        multiple 
                        type="file" 
                        onChange={(e)=>{setImages(e.target.files)}} className="h-[40px] border rounded-md"
                    />
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
                    <button onClick={handleSubmit} className="h-[50px] w-[200px] bg-green-950 text-white rounded-md ml-[20px]">Update Product</button>
                </div>
            </div>
        </div>
    )
}