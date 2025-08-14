import { useEffect, useState } from "react"

export default function ImageSlider(props){
    const [activeImageIndex , setActiveImageIndex] = useState(0)
    

    const images = props.images

    return(
        <div className="w-[400px] h-[600px]">
            <img className="w-full h-[500px] object-cover rounded-md border-[1px] border-blue-600" src={images[activeImageIndex]}/>
            <div className="flex justify-center items-center w-full h-[100px] gap-[10px]">
                {
                    images.map(
                        (url , index)=>{
                            return(
                                <img key={index} className={"w-[80px] h-[80px] object-cover rounded-md cursor-pointer"+(activeImageIndex == index && " border-[1px] border-purple-500")} 
                                onClick={
                                    ()=>{
                                        setActiveImageIndex(index)
                                    }
                                }
                                src={url}/>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}