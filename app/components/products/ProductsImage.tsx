"use client";

import { CartProductType, SelectImgType } from "@/app/product/[productId]/ProductDetails";

interface ProductImageProps{
    cartProduct: CartProductType,
    product: any,
    handColorSelect: (value: SelectImgType) => void;
}
const ProductImage: React.FC<ProductImageProps> = ({cartProduct, product, handColorSelect}) => {
    return ( 
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border max-h-[500px] min-h-[300px] sm:min-h-[400px]">
            {product.images.map((image: SelectImgType)=>{
                return(
                    <div key={image.weight} onClick={()=> handColorSelect(image)}
                    className={`relative w-[80%] aspect-square rounded border-teal-300 ${
                        cartProduct.selectImg.weight == image.weight ? "border-[1.5px]":"border-none"
                    }`}>
                        <img src={image.image} alt={image.weight}  className="object-contain"/>
                    </div>
                )
            })}
        </div>
        <div className="col-span-5 relative aspect-square">
            <img className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]" src={cartProduct.selectImg.image} alt={cartProduct.name} />
        </div>
    </div> );
}
 
export default ProductImage;