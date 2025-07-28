import { useState } from "react"
import toast from "react-hot-toast"
import uploadFile from "../utils/mediaUpload"





export default function TestPage(){

    const [file , setFile] = useState(null)


    function handleUpload(){
         uploadFile(file).then(
            (url)=>{
                console.log(url)
                toast.success("successfully uploaded")
            }
         ).catch(
            (error)=>{
                console.log(error)
                toast.error(error)
            }
         )
    }



    return(
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-row items-center justify-center">
                <input type="file" onChange={
                    (e)=>{
                        setFile(e.target.files[0])
                    }
                }/>
                <button onClick={handleUpload} className="h-[50px] w-[200px] bg-blue-600 text-white rounded-xl">Upload</button>
            </div>

        </div>
    )
}