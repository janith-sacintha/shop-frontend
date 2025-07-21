export default function ProductCard (props){

    console.log(props)

    return(
        <div>
            <h1>{props.name}</h1>
            <img src = {props.image}></img>
            <p>Price {props.price}</p>
            <button>View more</button>
        </div>
    )
}