"use client"
import { Consult } from "@prisma/client";
import React from "react";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import { truncateText } from "@/utils/truncateText";
interface DetailsPageProps {
    consult: Consult[];
}
const DetailsPage: React.FC<DetailsPageProps> = ({ consult }) => { 
    const router = useRouter();
    return (
        <div className="text-green">
        <h1 className="text-center font-bold text-2xl my-5">
            Послуги експертів з харчування та дієтологів 
        </h1>
        <div className="flex">
            {consult.map(item => (
                <div key={item.id} className="flex flex-col gap-1 w-1/4 max-h-[250px] cursor-pointer text-black bg-slate-50 rounded-md p-2 transition hover:scale-105 text-center text-sm hover:shadow-md mx-5" onClick={() => router.push(`/consult/${item.id}`)} >
                    <div className="aspect-square overflow-hidden relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="w-full flex justify-around items-center">
                        <p>{item.profession.split(',')[0]}</p>
                        <p>{item.initialConsult} грн</p>
                    </div>
                    <button className="font-bold border-1 text-green">{item.fullName}</button>
                </div>
            ))}
        </div>
    </div>
    
    );
}
 
export default DetailsPage;
