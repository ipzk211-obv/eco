"use client";
import { MdCheckCircle, MdDelete } from "react-icons/md";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductsImage";
import SetWeight from "@/app/components/products/SetWeight";
import SetQuantity from "@/app/components/products/SetQuantity";
import { Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";

interface ProductDetailsProps {
    product: any;
}

export type CartProductType = {
    id: string;
    name: string;
    description: string;
    charity: string;
    category: string;
    brand: string;
    selectImg: SelectImgType;
    quantity: number;
};

export type SelectImgType = {
    price: number;
    weight: string;
    image: string;
};

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const { handleAddProductToCart, handleRemoveProductFromCart, cartProducts } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        charity: product.charity,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectImg: { ...product.images[0] },
        quantity: 1,
    });
    const router = useRouter();

    useEffect(() => {
        setIsProductInCart(false);
        if (cartProducts) {
            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
            );
            if (existingIndex > -1) {
                setIsProductInCart(true);
            }
        }
    }, [cartProducts]);

    const productRating =
        product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
        product.reviews.length;

    const handColorSelect = useCallback(
        (value: SelectImgType) => {
            const selectedProduct = product.images.find((img: SelectImgType) => img.weight === value.weight);
            if (selectedProduct) {
                setCartProduct((prev) => {
                    return { ...prev, selectImg: { ...selectedProduct } };
                });
            }
        },
        [product.images]
    );

    const handleQtyIncrease = useCallback(() => {
        if (cartProduct.quantity === 99) {
            return;
        }
        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity + 1 };
        });
    }, [cartProduct]);

    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quantity === 1) {
            return;
        }
        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity - 1 };
        });
    }, [cartProduct]);

    const handleAddToCart = () => {
        if (product.inStock) {
            handleAddProductToCart(cartProduct);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-12 mt-7">
            <div><ProductImage cartProduct={cartProduct} product={product} handColorSelect={handColorSelect}/></div>
            <div className="flex flex-col gap-4 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <h2 className="text-3xl font-medium text-slate-700">{formatPrice(cartProduct.selectImg.price)}</h2>
                <div className="flex items-center gap-2 ">
                    <Rating value={productRating} readOnly />
                    <div>{product.reviews.length} відгуки</div>
                </div>
                {isProductInCart ? (
                    <>
                    <div className="mb-2 text-slate-500 flex items-center gap-1">
                        <MdCheckCircle className="text-teal-400" size={20}/>
                        <span>Товар доданий до корзини</span>
                        <div className="max-w-[300px]">
                            <Button label="Переглянути корзину" outline onClick={()=>{
                                router.push("/cart");
                            }
                            }/>
                        </div>
                        <MdDelete
                            className="text-red-500 cursor-pointer"
                            size={20}
                            onClick={() => handleRemoveProductFromCart(cartProduct)}
                        />
                        </div>
                    </>
                ) : (
                    <>
                    <div className="flex"><SetWeight cartProduct={cartProduct} images={product.images} handColorSelect={handColorSelect}/> 
                        <SetQuantity cartProduct={cartProduct} handleQtyDecrease={handleQtyDecrease} handleQtyIncrease={handleQtyIncrease}/>
                    </div>
                    <div className="max-w-[300px]">
                        <Button label="Додати в корзину" onClick={handleAddToCart} disabled={!product.inStock} />
                    </div>
                    </>
                )}
                <div className={product.inStock ? "text-teal-400": "text-rose-400"}>
                    {product.inStock ? "В наявності" : "Немає в наявності"}
                </div>
                <div className="font-semibold">
                    Склад продукту/Країна
                </div>
                <div className="text-justify">{product.description}</div>
                <Horizontal/>
                <div>
                    <span className="font-semibold">Категорія: </span>{product.category}
                </div>
                <Horizontal/>
            </div>
        </div>
    );
};

export default ProductDetails;
