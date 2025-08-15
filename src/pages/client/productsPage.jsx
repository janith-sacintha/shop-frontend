import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/productCard"

export default function ProductsPage (){
    const [products , setProducts] = useState([])
    const [loading , setLoading] = useState(true)
    
    useEffect(
        ()=>{
            if(loading){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                    (res)=>{
    //                    console.log(res.data)
                        setProducts(res.data)
                        setLoading(false)                   
                    }
                )
            }
        } ,
        [loading]
    )

    return(
        <div className="w-full h-full">
            {
                loading? <Loader/> : 
                <div className="w-full flex gap-[20px] p-[25px] flex-wrap justify-center iems-center">
                    {
                        products.map(
                            (product, index)=>{
                                return(
                                    <ProductCard key={index} product={product}/>
                                )
                            }
                        )
                    }
                </div>
            }
        </div>
    )
}