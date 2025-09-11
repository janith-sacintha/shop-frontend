import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/productCard"
import { useParams } from "react-router-dom"
import SearchBar from "../../components/searchBar"

export default function ProductsPage (){
    const [products , setProducts] = useState([])
    const [loading , setLoading] = useState(true)

    const {keyword}  = useParams()

    useEffect(() => {
        setLoading(true);

        let url;
        if (keyword) {
            // ✅ fetch products by search keyword
            url = `${import.meta.env.VITE_BACKEND_URL}/api/products/search/${keyword}`;
        } else {
            // ✅ fetch all products
            url = `${import.meta.env.VITE_BACKEND_URL}/api/products`;
        }

        axios.get(url)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setProducts([]);
                setLoading(false);
            });

    }, [keyword]);   // ✅ refetch whenever keyword changes



    /*
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
    */

    return(
        <div className="w-full h-full flex flex-col gap-5">
            <div className="p-[15px] flex items-center justify-center bg-blue-200"><SearchBar/></div>
            <div className="w-full h-full">
                { 
                    loading? <Loader/> : 
                    <div className="w-full flex gap-[20px] p-[25px] flex-wrap justify-center items-center">
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
        </div>
    )
        
}