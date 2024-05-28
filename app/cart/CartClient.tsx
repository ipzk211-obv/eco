"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/products/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps{
    currentUser: SafeUser | null
}
const CartClient: React.FC<CartClientProps> = ({currentUser}) => {
    const {cartProducts, handleClearCart, cartTotalAmount} = useCart()

    const router = useRouter()
    if(!cartProducts || cartProducts.length == 0){
        return(
            <div className="flex flex-col items-center text-green">
                <div className="text-2xl">
                    Ваша корзина пуста
                </div>
                <div>
                    <a href={"/"} className="text-slate-500 flex items-center m-2">
                        <MdArrowBack/>
                        <span>Розпочати покупки</span>
                    </a>
                </div>
            </div>
        )
    }
    return ( <div>
        <Heading title="Корзина" center/>
        <div className="grid text-green grid-cols-5 text-xs gap-4 pb-2 items-center mt-8 border-b-[1.5px] border-slate-200 py-4">
            <div className="col-span-2 justify-self-start ">Товар</div>
            <div className="justify-self-center">Ціна</div>
            <div className="justify-self-center">Кількість</div>
            <div className="justify-self-end">Всього</div>
        </div>
        <div>
            {cartProducts && cartProducts.map((item)=>{
                return <ItemContent key={item.id} item={item}/>
            })}
        </div>
        <div className=" text-greenborder-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
            <div className="w-[140px]">
                <Button label="Очистити корзину" onClick={()=>{
                    handleClearCart()
                }} small outline/>
            </div>
            <div className="text-green text-sm flex flex-col gap-1 items-start">
                <div className="flex justify-between w-full text-base font-semibold">
                    <span>Проміжний підсумок</span>
                    <span>{formatPrice(cartTotalAmount)}</span>
                </div>
                <p>Податки та вартість доставки розраховуються під час оформлення замовлення</p>
                <Button label={currentUser? "Оформити замовлення":"Увійдіть в аккаунт"} outline={currentUser ? false : true}
                onClick={()=>{
                    currentUser ? router.push('/checkout') : router.push('/login')
                }}/>
                <Link href={"/"} className=" flex items-center m-2">
                    <MdArrowBack/>
                    <span>Продовжити покупки</span>
                </Link>
            </div>
        </div>
    </div> );
}
 
export default CartClient;