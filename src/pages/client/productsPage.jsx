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

    const [query, setQuery] = useState("")

    useEffect(() => {
        setLoading(true);

        if (query == "") {
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
        } else {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/search/${query}/${page}/${limit}`)
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
        }

    }, [page, limit, query]);

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
            <div className="w-full flex justify-center items-center px-4">
                <input
                    className="mt-4 sm:mt-5 w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl
                            h-11 sm:h-12 rounded-md border border-[#ccc] px-4 py-2
                            text-sm sm:text-base
                            focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent
                            transition"
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
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

                <div className="mt-12 flex justify-center">
                    <Paginator currentPage={page} setCurrentPage={setPage} totalPages={totalPages} limit={limit} setLimit={setLimit} setLoading={setLoading}/>
                </div>
            </div>
            
            
        </div>
    )
        
}