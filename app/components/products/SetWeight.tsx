"use client"

import {SelectImgType, CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetWeightProps{
    images: SelectImgType[],
    cartProduct: CartProductType,
    handColorSelect: (value: SelectImgType) => void
}
const SetWeight: React.FC<SetWeightProps> = ({images, cartProduct, handColorSelect}) => {
    return ( 
    <div>
        <div className="flex gap-1 items-center">
            <div className="flex">{
                images.map((image, index)=>{
                return <div key={index}>
                    <div onClick={()=>handColorSelect(image)}
                    className={`mr-5 rounded-full
                    border-teal-300 flex items-center justify-center
                     ${cartProduct.selectImg.weight == image.weight ? "border-[1.5px]":"border-none"}`}>
                        <div className="w-full h-4 rounded-full border-[1.2px] p-3 border-slate-300 cursor-pointer flex items-center justify-center"> {image.weight}</div>
                    </div>
                </div>
            })
            }</div>
        </div>
    </div> );
}
 
export default SetWeight;