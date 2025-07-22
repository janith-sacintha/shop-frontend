import { Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className="w-full h-screen bg-red-950 flex">
            <div className="w-[300px] h-screen bg-white flex-col"></div>
            <div className="w-[calc(100%-300px)] h-full bg-blue-950 text-white">
                <Routes path="/">
                    <Route path="/" element={<h1>Dashboard</h1>}/>
                    <Route path="/products" element={<h1>Products</h1>}/>
                    <Route path="/oders" element={<h1>Oders</h1>}/>
                    <Route path="/reviews" element={<h1>Reviews</h1>}/>
                </Routes>
            </div>
        </div>
    )
}