"use client"
import React from "react";
import { CartProductType } from "../product/[productId]/ProductDetails";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps{
    item: CartProductType
}
const ItemContent: React.FC<ItemContentProps> = ({item}) => {
    const {handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease} = useCart()
    return ( 
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 bortder-t-[1.5px] border-slate-200 py-4 items-center text-green">
        <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
            <a href={`/product/${item.id}`}>
                <div className="relative w-[70px] aspect-square">
                    <img src={item.selectImg.image} alt={item.name} />
                </div>
            </a>
            <div className="flex flex-col justify-between">
                <a href={`/product/${item.id}`}>
                    {truncateText(item.name)}
                    <div>{item.selectImg.weight}</div>
                </a>
                <div>
                    <button className="text-green underline" onClick={()=>{handleRemoveProductFromCart(item)}}>Видалити</button>
                </div>
            </div>
        </div>
        <div className="justify-self-center">{formatPrice(item.selectImg.price)}</div>
        <div className="justify-self-center">
            <SetQuantity cartProduct={item} cartConter={true} handleQtyDecrease={()=>{handleCartQtyDecrease(item)}} handleQtyIncrease={()=> {handleCartQtyIncrease(item)}} />
        </div>
        <div className="justify-self-end font-semibold">{formatPrice(item.selectImg.price*item.quantity)}</div>
    </div>
     );
}
 
export default ItemContent;