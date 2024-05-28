"use client";
import React, { useState, useEffect } from 'react';
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import NullData from '../NullData';
import { CiShoppingCart } from "react-icons/ci";

interface ProductCardProps {
    data: any[];
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const router = useRouter();
    const params = useSearchParams();
    const category = params?.get("category");
    const searchTerm = params?.get("searchTerm");
    const [filteredData, setFilteredData] = useState<any[]>([]);

    const getTreesWord = (count: number) => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'відгук';
        } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
            return 'відгуки';
        } else {
            return 'відгуків';
        }
    };

    useEffect(() => {
        const filtered = data.filter((product: any) => {
            return (searchTerm === null || (searchTerm && product.name.toLowerCase().includes(searchTerm.toLowerCase()))) && (category === null || product.category === category);
        });
        setFilteredData(filtered);
    }, [data, category, searchTerm]);
    
    return (
        <>
            {filteredData.length === 0 ? (
                <div />
            ) : (
                filteredData.map((product: any) => {
                    const productRating = product.reviews.length > 0 ? product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length : 0;
                    const reviewsCount = product.reviews.length;
                    const reviewsCountText = `${reviewsCount} ${getTreesWord(reviewsCount)}`;

                    return (
                        <div key={product.id} onClick={() => router.push(`/product/${product.id}`)} className="col-span-1 cursor-pointer text-black bg-slate-50 rounded-md p-2 transition hover:scale-105 text-center text-sm hover:shadow-md">
                            <div className="flex flex-col items-center w-full gap-1">
                                <div className="aspect-square overflow-hidden relative w-full">
                                    <img src={product.images[0].image} alt={product.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="mt-4">
                                    {truncateText(product.name)}
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <div><Rating value={productRating} readOnly /></div>
                                    <div>{reviewsCountText}</div>
                                </div>
                                <div className='w-full flex justify-between items-center'>
                                    <div className='border rounded-md p-2 hover:bg-lime-300 hover:text-white transition'>{product.images[0].weight}</div>
                                    <div className="font-semibold text-red-500">{formatPrice(product.images[0].price)}</div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
}

export default ProductCard;
