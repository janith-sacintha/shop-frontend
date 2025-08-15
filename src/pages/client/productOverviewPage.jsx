import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/loader"
import ImageSlider from "../../components/imageSlider"
import { addToCart, getCart } from "../../utils/cart"

export default function ProductOverviewPage(){
    const params = useParams()
    const [product , setProduct] = useState(null)
    const navigate = useNavigate()
    const[status , setStatus] = useState("loading") //loading , success , error - invalid productId

    useEffect(
        ()=>{
            if(status == "loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/"+params.productId).then(
                    (res)=>{
                        console.log(res.data)
                        setProduct(res.data)
                        setStatus("success")
                    }
                ).catch(
                    (error)=>{
                        setStatus("error")
                        toast.error("Failed to fetch product")
                    }
                )
            }

        },
        [status]
    )

    return(
        <div className="w-full h-full flex">
            {
                status == "loading" && <Loader/>
            }
            {
                status == "success" && <div className="w-full h-full flex">
                    <div className="w-[49%] h-full flex flex-col items-center justify-center">
                            <ImageSlider images={product.images}/>
                    </div>
                    <div className="w-[49%] h-full flex flex-col pt-[40px]">
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <span className="font-light text-orange-500">{product.altNames.join(" | ")}</span>
                        <p className="mt-[30px]">{product.description}</p>
                        <div className="mt-[20px]">
                            {
                                product.labelledPrice > product.price? 
                                <div>
                                    <span className="line-through mr-[20px] text-red-500 font-semiboLKR">{product.labelledPrice}</span>
                                    <span className="text-2xl text-green-800 font-bold">LKR {product.price.toLocaleString('en-us' , {minimumFractionDigits : 2 , maximumFractionDigitd : 2})}</span>
                                </div>
                                :
                                <div>
                                    <span className="text-2xl text-green-800 font-bold">LKR {product.price.toLocaleString('en-us' , {minimumFractionDigits : 2 , maximumFractionDigitd : 2})}</span>
                                </div>
                            }
                        </div>
                        <div className="w-full flex  items-center mt-[10px] gap-[15px] text-white font-bold text-[15px]">
                            <button className="h-[40px] w-[200px] bg-orange-500 rounded-md cursor-pointer shadow-xl hover:bg-white border-[1px] border-orange-500 hover:text-orange-500" onClick={
                                ()=>{
                                    addToCart(product, 1)
                                    toast.success("Product added to cart")
                                    console.log(getCart())
                                }
                            }>Add to cart</button>
                            <button className="h-[40px] w-[200px] bg-green-800 rounded-md cursor-pointer shadow-xl hover:bg-white border-[1px] border-green-800 hover:text-green-700"
                            onClick={
                                ()=>{
                                    navigate("/checkout" , {state : {items:
                                        [
                                            {
                                                productId : product.productId,
                                                quantity : 1,
                                                name : product.name,
                                                image : product.images[0],
                                                price : product.price
                                            }
                                        ]
                                    }})
                                }
                            }>Buy Now</button>
                        </div>
                    </div>
                </div>
            }
            {
                status == "error" && <div>Producut error</div>
            }
        </div>
    )
}