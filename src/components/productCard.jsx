import { BiStrikethrough } from "react-icons/bi"
import { Link } from "react-router-dom"

export default function ProductCard (props){
    const product = props.product

    return(
        <Link to={"/overview/"+product.productId} className="overflow-hidden h-[400px] w-[300px]  bg-white rounded-xl shadow-2xl shrink-0">
            <img className="w-full h-[280px] object-cover" src = {product.images[0]}></img>
            <div className="w-full h-[120px] p-[10px]">
                <span className="text-gray-400 text-[12px] ">{product.productId}</span>
                <h1 className="text-lg font-bold">{product.name}</h1>
                <span>
                    {
                        product.labelledPrice > product.price ? 
                        <p>
                            <span className="line-through mr-[10px] text-red-500">{product.labelledPrice}</span>
                            <span className="text-lg">{product.price.toLocaleString('en-us' , {minimumFractionDigits : 2 , maximumFractionDigitd : 2})}</span>
                        </p>
                         : <span className="text-lg">{product.price.toLocaleString('en-us' , {minimumFractionDigits : 2 , maximumFractionDigitd : 2})}</span>
                    }
                </span>
            </div>
        </Link>
    )
}