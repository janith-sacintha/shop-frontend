import ProductCard from "./productCard";

export default function SuperProduct(){
    return(
        <div>
            <h1>Super Product !! </h1>
            <ProductCard
                name="samsung" 
                price="5000" 
                image = "https://picsum.photos/id/2/200/300" />
        </div>
        
    )
}