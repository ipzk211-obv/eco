"use client";
import React, { useEffect, useState } from 'react';
import { formatPrice } from "@/utils/formatPrice";
import { useRouter, useSearchParams } from "next/navigation";
import NullData from '../NullData';

interface OrderCardProps {
    data: any[]; 
    product: ProductCardProps[]
}
type ProductCardProps = {
    product: any[];
}

const OrderCard: React.FC<OrderCardProps> = ({ data, product }) => {
    const router = useRouter();
    const params = useSearchParams();
    const category = params?.get("category");
    const searchTerm = params?.get("searchTerm");
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const filtered = product.filter((product: any) => {
            return (searchTerm === null || (searchTerm && product.name.toLowerCase().includes(searchTerm.toLowerCase()))) && (category === null || product.category === category);
        });
        setFilteredData(filtered);
        setLoading(false);
    }, [product, category, searchTerm]);
    
    const getTotalAmount = (orders: any[]) => {
        let total = 0;
        orders.forEach((order: any) => {
            if (order.status === "complete") {
                total += order.amount;
            }
        });
        return total;
    };

    const getTreesWord = (count: number) => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'нове дерево';
        } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
            return 'нових дерева';
        } else {
            return 'нові дерева';
        }
    };

    const treesPlanted = Math.floor(((getTotalAmount(data)) / 100 / 4 + 1000)/ 38);
    
    return (
            <div className=' flex justify-center items-center bg-bg rounded-br-[150px]'>
                {loading ? (
                    <NullData title='Завантаження' />
                ) : (
                    <div>
                        {filteredData.length === 0 ? (
                            <NullData title='Упс! Товарів з даною категорією ще не завезли!' />
                        ) : (
                            <div className='flex'>
                                <div className="relative mt-7 mb-4">
                                    <div className="absolute inset-0 bg-green-100 blur-md"></div> 
                                    <div className="relative sm:grid-cols-1 grid grid-cols-2 md:grid-cols-2 gap-12 justify-center p-4">
                                        <div className="text-white flex flex-col justify-center items-start gap-4 z-10 pl-10 sm:pl-0"> 
                                            <p className='text-[53px] sm:text-center font-bold lg:text-[35px]'><span>25%</span> з продажу йдуть на благодійнісь.</p>
                                            <p className='text-[22px] sm:text-center lg:text-[15px]'>Зібрано <span>{formatPrice((getTotalAmount(data)) / 100 / 4 + 1000)}</span>.
                                            гривень: допомога, що росте як ліс, еквівалентна посадці <span className=" text-xl font-bold">{treesPlanted}</span> {getTreesWord(treesPlanted)} могутніх дерев, що оживлять нашу планету.</p>
                                            <a href='/charity' className="mt-5 lg:text-[12px] sm:w-full sm:text-center border-2  rounded-md p-3 border-white hover:bg-lime-400 hover:border-lime-400 transition-all duration-300">Детальніше...</a>
                                        </div>
                                        <div className="relative drop-shadow-md hover:drop-shadow-xl">
                                            <img src="/baner.png" alt="банер" className="rounded-lg" /> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
    );
}

export default OrderCard;
