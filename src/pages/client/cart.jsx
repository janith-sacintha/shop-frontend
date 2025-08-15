import { useState } from "react"
import { addToCart, getCart, getTotal } from "../../utils/cart.js"
import { BiTrash } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

export default function CartPage(){
    const navigate = useNavigate()
    const [cart , setCart] = useState(getCart())

    return(
        <div className="w-full h-screen flex flex-col items-center py-[40px] gap-[20px]">
            {
                cart.map(
                    (item)=>{
                        return(
                            <div key={item.productId} className="w-[700px] h-[150px] shadow-2xl rounded-md border-[1px] border-purple-300 flex items-center p-[25px] relative">
                                <img src={item.image} className="w-[100px] h-[100px] object-cover"/>
                                <div className="w-[300px] flex flex-col justify-center p-[20px] font-bold">
                                    <h1>{item.name}</h1>
                                    <p className="font-semibold">LKR {item.price.toLocaleString('en-us' , {minimumFractionDigits : 2 , maximumFractionDigitd : 2})}</p>
                                </div>
                                <div className="w-[100px] flex justify-center items-center gap-[10px]">
                                    <button className="w-[30px] h-[30px] bg-blue-500 text-white font-bold rounded-sm cursor-pointer hover:bg-blue-300 flex items-center justify-center" onClick={
                                        ()=>{
                                            addToCart(item , -1)
                                            setCart(getCart())
                                        }
                                    }>-</button>
                                    <span className="w-[20px] h-[20px] text-center">{item.quantity}</span>
                                    <button className="w-[30px] h-[30px] bg-blue-500 text-white font-bold rounded-sm cursor-pointer hover:bg-blue-300 flex items-center justify-center" onClick={
                                        ()=>{
                                            addToCart(item , 1)
                                            setCart(getCart())
                                        }
                                    }>+</button>
                                </div>
                                <div className="w-[200px] flex items-center justify-end">
                                    <span>
                                    LKR {(item.quantity*item.price).toLocaleString('en-us' , {minimumFractionDigits : 2 , maximumFractionDigitd : 2})}
                                    </span>
                                </div>
                                <button className="absolute right-[-70px] w-[30px] h-[30px] bg-red-700 text-white rounded-full border-[2px] border-red-700 flex items-center justify-center cursor-pointer hover:text-red-700 hover:bg-white p-[px] text-md"
                                onClick={
                                    ()=>{
                                        addToCart(item , -item.quantity)
                                        setCart(getCart())
                                    }
                                }><BiTrash/></button>
                            </div>
                        )
                    }
                )
            }
            <div className="w-[700px] h-[100px] shadow-2xl rounded-sm border-[1px] border-blue-300 flex flex-col gap-[10px] justify-center items-end pr-[25px]">
                <span className="font-bold">Total : LKR {getTotal().toLocaleString('en-us' , {minimumFractionDigits : 2 , maximumFractionDigitd : 2})}</span>
                <button className="left-[25px] w-[200px] h-[40px] rounded-md border-[2px] border-orange-500 bg-orange-500 text-white font-bold hover:bg-white hover:text-orange-500 hover:w-[210px] cursor-pointer"
                onClick={
                    ()=>{
                        navigate("/checkout" , {state : {items : cart}})
                    }
                }>Checkout</button>
            </div>
        </div>
    )
}