import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function login(){
        console.log(email,password)
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
            email : email,
            password : password
        }).then(
            (response)=>{
                console.log(response.data)
                localStorage.setItem("token",response.data.token)
                toast.success("Login successful")

                if(response.data.role == "admin"){
                    //admin page
                    navigate("/admin")
                }else if(response.data.role == "user"){
                    //user page
                    navigate("/")
                }
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("Login failed")
            }
        )
        
    }

    return(
        <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-center flex justify-center items-center">
            <div className="h-[500px] w-[500px] backdrop-blur-xs shadow-3xl rounded-[40px] flex flex-col relative  items-center justify-center gap-[25px]">
                <h1 className="text-5xl font-bold text-center absolute top-[30px]">Login</h1>
                <div className=" flex flex-col gap-[5px] mt-5">
                    <span className="text-lg">Email</span>
                    <input onChange={
                        (e)=>{
                            setEmail(e.target.value)
                        }
                    } className="border w-[375px] h-[50px] border-purple-400 rounded-2xl p-[25px] text-lg" type="text" placeholder="Email"/>
                </div>
                <div className=" flex flex-col gap-[5px]">
                    <span className="text-lg">Password</span>
                    <input onChange={
                        (e)=>{
                            setPassword(e.target.value)
                        }
                    } className="border w-[375px] h-[50px] border-purple-400 rounded-2xl p-[25px] text-lg" type="text" placeholder="Password"/>
                </div>
                <div>
                    <button onClick={login} className="w-[150px] h-[40px] bg-blue-500 text-lg text-white rounded-[5px]">
                        Login
                    </button>
                </div>
                <p className="text-xl w-[375px]">Don't have an account? <Link className="text-purple-500 text-bold" to="/register">Sign up</Link> from here</p>
            </div>
        </div>
    )
}