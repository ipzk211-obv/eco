"use client"
import { SafeUser } from "@/types";
import Heading from "../components/products/Heading";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Order, User } from "@prisma/client";
import { formatPrice } from "@/utils/formatPrice";


interface UpdateProfileProps {
    currentUser: SafeUser | null
    orders: ExtendedOrder[],
}
type ExtendedOrder = Order & {
    user: User
}

const ProfileForm: React.FC<UpdateProfileProps> = ({ currentUser, orders }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [amountTotal, setAmountTotal] = useState(0);
    const { register, handleSubmit, setValue } = useForm(); 
    const router = useRouter();
    useEffect(() => {
        if (orders) {
            let amountTotal = 0;
            const uniqueOrdersCopy = [...orders];
            for (let i = 0; i < uniqueOrdersCopy.length; i++) {
                if (uniqueOrdersCopy[i].status === "complete") { 
                    amountTotal += uniqueOrdersCopy[i].amount; 
                }
            }
            setAmountTotal(amountTotal);
        }
    }, [orders]);
    
    useEffect(() => {
        if (currentUser?.name) {
            setValue('name', currentUser.name);
        }
    }, [currentUser, setValue]);

    const handleDispatch = useCallback((id: string, data: FieldValues) => {
        axios.put('/api/user', {
            id,
            name: data.name, 
        }).then((res) => {
            router.refresh();
            setIsSaved(true);
        }).catch((error) => {
            console.log(error);
        });
    }, [router]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        handleDispatch(currentUser?.id || '', data); 
    };

    const handleDeleteAccount = () => {
        if (currentUser) {
            axios.delete(`/api/consult/${currentUser.id}`).then((res)=>{
                router.refresh();
                router.push('/');
            }).catch((error)=>{
                console.log(error);
            });
            axios.delete(`/api/rating/${currentUser.id}`).then((res)=>{
                router.refresh();
                router.push('/');
            }).catch((error)=>{
                console.log(error);
            });
            axios.delete(`/api/order/${currentUser.id}`).then((res)=>{
                    router.refresh();
                    router.push('/');
                }).catch((error)=>{
                    console.log(error);
                });
            axios.delete(`/api/user/${currentUser.id}`).then((res)=>{
                router.refresh();
                router.push('/');
            }).catch((error)=>{
                console.log(error);
            });
        }
    };
    // const getTreesWord = (count: number) => {
    //     if (count % 10 === 1 && count % 100 !== 11) {
    //         return 'нове дерево';
    //     } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    //         return 'нових дерева';
    //     } else {
    //         return 'нові дерева';
    //     }
    // };
    return (
        <div>
            <Heading title="Персональні дані" />
            <h1 className="text-green font-bold mb-5 mt-5">Зміні персональних даних</h1>
            <form onSubmit={handleSubmit(onSubmit)} className=" text-green"> 
                <div className="flex flex-col text-green">
                    <input type="email" defaultValue={currentUser?.email || ''} disabled className="p-4 border-2 mb-4" />
                    <input {...register('name')} type="text" defaultValue={currentUser?.name || ''} className="p-4 border-2 mb-4" /> 
                </div>
                <button className="w-full py-2 text-green items-center rounded text-center border border-green" type="submit">Змінити</button> 
            </form>
            {isSaved && <p>Дані збережені!</p>}
            <button className="w-full my-5 py-2 text-rose-700 items-center rounded text-center border border-rose-700" onClick={handleDeleteAccount}>Видалити аккаунт</button>
            <h1 className="text-green font-bold mb-3 mt-5">Персональні дані замовлень</h1>
            <div className="text-green flex justify-between mb-2">
                <p className="text-center">Кількість замовлень: {orders.length}</p>
                <p className="text-center">Сума замовлень: {formatPrice(amountTotal/100)}</p>
                <p className="text-center">Благодійність: {formatPrice(amountTotal/100/4)}</p>
            </div>
            <p className=" text-green py-2 rounded text-center border border-green">Завдяки вам ми посадимо {Math.round(amountTotal/100/4/38)} 🌳.</p>
        </div>
    );
}

export default ProfileForm;
