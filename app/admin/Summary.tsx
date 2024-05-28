"use client"

import { Order, Product, User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Heading from "../components/products/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { formatNumber } from "@/utils/formatNumber";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import NullData from "../components/NullData";

interface SummaryProps{
    orders: Order[];
    products: Product[];
    users: User[];
    currentUser: SafeUser | null;
}

type SummaryDataType = {
    [key: string]:{
        label: string,
        digit: number,
    }
}

const Summary: React.FC<SummaryProps> = ({orders, products, users, currentUser}) => {
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(true); 
    const [loading, setLoading] = useState(true);
    const [pageReady, setPageReady] = useState(false);
    const [summaryData, setSummaryData] = useState<SummaryDataType>({
        sale:{
            label: "Всього продано на",
            digit: 0
        },
        products:{
            label: "Всього товарів",
            digit: 0
        },
        orders:{
            label: "Всього замолень",
            digit: 0
        },
        paidOrders:{
            label: "Оплачені замовлення",
            digit: 0
        },
        unpaidOrders:{
            label: "Не оплачені замовлення",
            digit: 0
        },
        users:{
            label: "Всього користуачів",
            digit: 0
        },
    });

    const [uniqueOrders, setUniqueOrders] = useState<Order[]>([]);

    useEffect(() => {
        if (currentUser == null || currentUser.role !== "ADMIN") {
            router.push('/');
        } else {
            setPageReady(true); 
            setRedirecting(false); 
        }
        if (orders && products && users) { 
            setLoading(false);
        }
        if (orders) {
            const uniqueOrdersCopy = [...orders];
    
            for (let i = 0; i < uniqueOrdersCopy.length - 1; i++) {
                const currentDate = new Date(uniqueOrdersCopy[i].createDate);
                const nextDate = new Date(uniqueOrdersCopy[i + 1].createDate);
                // if (currentDate.toISOString().slice(0, 19) === nextDate.toISOString().slice(0, 19)) {
                    
                    if (uniqueOrdersCopy[i].status !== "complete" && uniqueOrdersCopy[i + 1].status !== "complete" ) {
                        uniqueOrdersCopy.splice(i, 1);
                    } else if (uniqueOrdersCopy[i].status === "complete") {
                        uniqueOrdersCopy.splice(i + 1, 1);
                    } else {
                        uniqueOrdersCopy.splice(i, 1);
                    }
                // }
            }
            setUniqueOrders(uniqueOrdersCopy);
        
        setSummaryData((prev)=>{
            let tempData = {...prev}

            const totalSale = orders.reduce((acc, item)=>{
                if(item.status == "complete"){
                    return acc + item.amount
                }else return acc
            }, 0)
            const paidOrders = orders.filter((order=>{
                return order.status == "complete"
            }))
            const unpaidOrders = orders.filter((order=>{
                return order.status == "pending"
            }))
            tempData.sale.digit = totalSale/100;
            tempData.orders.digit = uniqueOrdersCopy.length;
            tempData.paidOrders.digit = paidOrders.length;
            tempData.unpaidOrders.digit = uniqueOrdersCopy.length-paidOrders.length;
            tempData.products.digit = products.length;
            tempData.users.digit = users.length;

            return tempData
        })
    }
    }, [currentUser, router, orders, products, users]);

    if (!pageReady) {
        return <NullData title="Завантаження"/>;
    }
    if (redirecting) {
        return <NullData title="Ой, вам сюди не можна!"/>;
    }
    const summaryKeys = Object.keys(summaryData)

    return ( 
    <div className=" max-w-[1150px] m-auto text-green">
        <div className="mb-4 text-center">
            <Heading title="Загальна статистика та графік за останні 7 днів"/> 
        </div>
        <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
            {
                summaryKeys && summaryKeys.map((key)=>{
                    return <div key={key} className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition">
                        <div className="text-xl md:text-4xl font-bold">
                            {
                                summaryData[key].label == "Всього продано на" ? <>{formatPrice(summaryData[key].digit)}</> : <>{formatNumber(summaryData[key].digit)}</>
                            }
                        </div>
                        <div>{summaryData[key].label}</div>
                    </div>
                })
            }
        </div>
    </div> );
}
 
export default Summary;