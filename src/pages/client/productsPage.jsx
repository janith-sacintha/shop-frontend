import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/productCard"

import Paginator from "../../components/paginator"

export default function ProductsPage (){
    const [products , setProducts] = useState([])
    const [loading , setLoading] = useState(true)

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        setLoading(true);

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${page}/${limit}`)
            .then((res) => {
                setProducts(res.data.products);
                setTotalPages(res.data.totalPages)
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setProducts([]);
                setLoading(false);
            });

    }, [page,limit]);  



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
            <div className="mt-12 flex justify-center">
                <Paginator currentPage={page} setCurrentPage={setPage} totalPages={totalPages} limit={limit} setLimit={setLimit} setLoading={setLoading}/>
            </div>
        </div>
    )
        
}