import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import Loader from "../../components/loader"
import ImageSlider from "../../components/imageSlider"

export default function ProductOverviewPage(){
    const params = useParams()
    const [product , setProduct] = useState(null)
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
                    <div className="w-[49%] h-full">
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                    </div>
                </div>
            }
            {
                status == "error" && <div>Producut error</div>
            }
        </div>
    )
}