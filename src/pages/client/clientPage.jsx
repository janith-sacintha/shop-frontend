import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";

export default function ClientWebPage (){
    return(
        <div className="w-full h-screen max-h-screen ">
            <Header/>
            <div className="w-full h-[calc(100%-100px)] bg-green-200">
            <Routes path="/">
                <Route path="/" element={<h1 className="text-3xl text-black text-center">Home page</h1>}/>
                <Route path="/products" element={<h1 className="text-3xl text-black text-center">Products page</h1>}/>
                <Route path="/reviews" element={<h1 className="text-3xl text-black text-center">Review page</h1>}/>
                <Route path="/about-us" element={<h1 className="text-3xl text-black text-center">About Us page</h1>}/>
                <Route path="/contact-us" element={<h1 className="text-3xl text-black text-center">Contact US page</h1>}/>
                <Route path="/*" element={<h1 className="text-3xl text-black text-center">404 Not Found</h1>}/>
            </Routes>
            </div>
        </div>
    )
}