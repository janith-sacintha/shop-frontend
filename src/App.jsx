
import './App.css'
import ProductCard from './components/productCard'
import SuperProduct from './components/superProduct'

function App() {

  return (
    <>
    <div className="w-full h-screen bg-blue-300">
      <div className="w-[600px] h-[600px] bg-green-900 flex justify-center items-center">
        <div className="bg-white w-[75px] h-[75px]"></div>
        <div className="bg-green-500 w-[75px] h-[75px]"></div>
        <div className="bg-yellow-400 w-[75px] h-[75px]"></div>
        <div className="bg-red-800 w-[75px] h-[75px]"></div>
      </div>
    </div>
      
    </>
  )
}

export default App
