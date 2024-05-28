export const revalidate = 0;

import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import  { IProductParams } from "@/actions/getProduct";
import NullData from "./components/NullData";
import getProducts from "@/actions/getProduct";
import getOrders from "@/actions/getOrders";
import OrderCard from "./components/products/OrderCard";
import Heading from "./components/products/Heading";
import HomeProductCard from "./components/products/HomeProductCard";

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
   <div className="bg-slate-50 pt-0">
        <div>
          <OrderCard data={orders} product={shuffledProducts}/>
      </div>
      <div>
        <p className="text-green text-3xl w-full items-center text-center pt-4 mb-4 font-bold">Партнери</p>
        <div className="flex justify-center">
          <img src="/1.png" alt="1" className="w-[120px] mr-10 cursor-pointer"/>
          <img src="/2.png" alt="2" className="w-[120px] cursor-pointer"/>
          <img src="/3.png" alt="3" className="w-[120px] ml-10 cursor-pointer"/>
        </div>
      </div>
      <div>
        <p className="text-green text-3xl w-full items-center text-center pt-4 mb-5 mt-5 font-bold">Готова їжа</p>
        <Container>
          <div className="grid grid-cols-4  xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <HomeProductCard data={shuffledProducts} categoryy="Готова їжа"/>
          </div>
        </Container>
        <p className="text-green text-3xl w-full items-center text-center pt-4 mb-5 mt-5 font-bold">Натуральні солодощі</p>
        <Container>
        <div className="grid grid-cols-4  xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              <HomeProductCard data={shuffledProducts} categoryy="Натуральні солодощі"/>
          </div>
        </Container>
        <p className="text-green text-3xl w-full items-center text-center pt-4 mb-5 mt-5 font-bold">Горіхи та снеки</p>
        <Container>
        <div className="grid grid-cols-4  xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              <HomeProductCard data={shuffledProducts} categoryy="Горіхи та снеки"/>
          </div>
        </Container>
        <p className="text-green text-3xl w-full items-center text-center pt-4 mb-5 mt-5 font-bold">Гігієна та побут</p>
        <Container>
        <div className="grid grid-cols-4  xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <HomeProductCard data={shuffledProducts} categoryy="Гігієна та побут"/>
          </div>
        </Container>
      </div>
  </div>
  )
}
