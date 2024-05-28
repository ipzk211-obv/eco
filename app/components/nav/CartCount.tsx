"use client"

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

const CartCount = () => {
    const {cartTotalQty} = useCart();
    const router = useRouter();

    return ( 
    <div className="relative  border-[1px] hover:border-[1px] border-green flex flex-row items-center gap-1 rounded-md cursor-pointer hover:shadow-md transition p-1" onClick={()=> router.push("/cart")}>
        <div className="flex items-center">
            <IoCartOutline size={30}/>
            <p className="text-[16px] ml-1">Корзина</p>
        </div>
        <span className=" absolute top-[-3px] text-sm right-[73px] opacity-90 text-white font-bold h-5 w-5 rounded-full flex items-center justify-center bg-green ">
            {cartTotalQty}
        </span>
    </div> );
}
 
export default CartCount;