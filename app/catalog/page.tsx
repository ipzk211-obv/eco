import getOrders from "@/actions/getOrders";
import getProducts, { IProductParams } from "@/actions/getProduct";
import NullData from "../components/NullData";
import Container from "../components/Container";
import ProductCard from "../components/products/ProductCard";
import Heading from "../components/products/Heading";
import Categories from "../components/nav/Categories";
import SearchBar from "../components/nav/SearchBar";


interface HomeProps{
  serchParams: IProductParams
}

export default async function Home({serchParams}: HomeProps) {
  const products = await getProducts(serchParams)
  const orders = await getOrders();
  if(products.length == 0){
    return <NullData title="Помилка"/>
  }
  function shuffleArray(array:any){
    for(let i = array.length - 1; i>0; i--){
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
  const shuffledProducts = shuffleArray(products);
  return (

   <div className="bg-slate-50">
    <SearchBar/>
    <h1 className="text-center text-green font-bold text-3xl my-2">Каталог товарів</h1>
    <Container>
        <div className="w-full flex text-center">
          <div>
          <Categories/>
          </div>
          <div className="grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-2 gap-8">
              <ProductCard data={shuffledProducts}/>
          </div>
        </div>
    </Container>
  </div>
  )
}
