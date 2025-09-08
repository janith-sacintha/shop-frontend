import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { BiTrash } from "react-icons/bi"
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function CheckoutPage(){
    const navigate = useNavigate()
    const location = useLocation()
    const [cart , setCart] = useState(location.state.items || [])

    if(location.state == null){
        toast.error("Please add products to the cart first")
        navigate("/products")
    }

// getting the checkout page total
 function getTotal(){
        let total = 0
        cart.forEach((item) => {
            total += item.price*item.quantity
        })
    
        return total;
    }

async function placeOrder(){
    const token = localStorage.getItem("token")
    if(token == null){
        toast.error("Login first to place the Order")
        navigate("/login")
        return;
    }

    const order = {
        address : "kandy",
        phone : "0710441781",
        items : []
    }

    cart.forEach((item)=>{
        order.items.push({
            productId : item.productId,
            qty : item.quantity
        })
    })

    try{
        await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/orders" , order , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        toast.success("Order placed successfully")

    }catch(error){
        console.error(error , "error placing cart")
        toast.error("Failed to place order")
        return;
    }
}

    return(
        <div className="w-full h-screen flex flex-col items-center py-[40px] gap-[20px]">
            {
                cart.map(
                    (item , index)=>{
                        return(
                            <div key={item.productId} className="w-[700px] h-[150px] shadow-2xl rounded-md border-[1px] border-purple-300 flex items-center p-[25px] relative">
                                <img src={item.image} className="w-[100px] h-[100px] object-cover"/>
                                <div className="w-[300px] flex flex-col justify-center p-[20px] font-bold">
                                    <h1>{item.name}</h1>
                                    <p className="font-semibold">LKR {item.price.toLocaleString('en-us' , {minimumFractionDigits : 2 , maximumFractionDigitd : 2})}</p>
                                    <Link to={`/overview/${item.productId}`} className="text-red-500 text-sm h-[30px] w-[150px] rounded-md bg-red-200 flex items-center justify-center">view product info &raquo;</Link>

                                </div>
                                <div className="w-[100px] flex justify-center items-center gap-[10px]">
                                    <button className="w-[30px] h-[30px] bg-blue-500 text-white font-bold rounded-sm cursor-pointer hover:bg-blue-300 flex items-center justify-center" onClick={
                                        ()=>{
                                            const newCart = [...cart]           // useState cant identify the changes happens to the cart refference (basically asign another name --> cart/newCart) , so therefore we have to intentionaly create a new array by using this method . If not this doesnt make a copy | for JSON {...}
                                            newCart[index].quantity -= 1
                                            if(newCart[index].quantity <=0){
                                                newCart.splice(index,1)
                                            }
                                            setCart(newCart)
                                        }
                                    }>-</button>
                                    <span className="w-[20px] h-[20px] text-center">{item.quantity}</span>
                                    <button className="w-[30px] h-[30px] bg-blue-500 text-white font-bold rounded-sm cursor-pointer hover:bg-blue-300 flex items-center justify-center" onClick={
                                        ()=>{
                                            const newCart = [...cart]
                                            newCart[index].quantity += 1
                                            setCart(newCart)
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
                                            const newCart = [...cart]
                                            newCart.splice(index,1)
                                            setCart(newCart)
                                        }
                                    }><BiTrash/></button>
                            </div>
                        )
                    }
                )
            }
            <div className="relative w-[700px] h-[100px] shadow-2xl rounded-sm border-[1px] border-blue-300 flex flex-col gap-[10px] justify-center items-end px-[25px]">
                <span className="font-bold">Total : LKR {getTotal().toLocaleString('en-us' , {minimumFractionDigits : 2 , maximumFractionDigitd : 2})}</span>
                <button className="w-[200px] h-[40px] rounded-md border-[2px] border-orange-500 bg-orange-500 text-white font-bold hover:bg-white hover:text-orange-500 hover:w-[210px] cursor-pointer"
                onClick={placeOrder}>Place Order</button>
                <Link className="absolute left-[250px] bottom-[15px] text-sm text-orange-500 font-semibold" to="/login"
                >Login first to place your Order
                </Link>
            </div>
        </div>
    )
}