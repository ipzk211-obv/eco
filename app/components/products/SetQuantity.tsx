"use client"

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQtyProps{
    cartConter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}
const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded";
const SetQuantity: React.FC<SetQtyProps> = ({cartProduct, cartConter, handleQtyDecrease, handleQtyIncrease}) => {
    return ( <div className="flex gap-4 items-center text-base">
        {cartConter ? null : <div className="font-semibold">Кількисть:</div> }
        <div className="flex gap-3 items-center text-green">
            <button className={btnStyles} onClick={handleQtyDecrease}>-</button>
            <div>{cartProduct.quantity}</div>
            <button className={btnStyles} onClick={handleQtyIncrease}>+</button>
        </div>
    </div> );
}
 
export default SetQuantity;