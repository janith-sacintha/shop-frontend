import { useState } from "react"

export default function TestPage(){


    const [count , setCount] = useState(0)

    function increment(){
        setCount(count + 1)
    }

    function decrement(){
        setCount(count - 1)
    }

    return(
        <div className="bg-amber-200 w-full h-screen flex justify-center items-center">
            <div className="bg-white h-[400px] w-[400px] flex flex-col justify-center items-center rounded-3xl border-amber-700 border-1">
                <div className="text-7xl font-bold">{count}</div>
                <div className="flex w-full justify-center items-center mt-[50px]">
                    <button onClick={decrement} className = "bg-blue-500 text-white mx-[10px] my-[10px] h-[100px] w-[150px] rounded-full text-5xl font-bold">-</button>
                    <button onClick={increment} className = "bg-blue-500 text-white mx-[10px] my-[10px] h-[100px] w-[150px] rounded-full text-5xl font-bold">+</button>
                </div>
            </div>
        </div>
    )
}