"use client"
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { SafeUser } from "@/types";
import { Consult, OrderConsult } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface AddAppointment{
    consult: Consult & {
        orderConsult: OrderConsult[]
    }| null;
    user:(SafeUser &{
    }) | null;
}
const Appointment:React.FC<AddAppointment> = ({consult, user}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            comment: "",
            phone: "",
            status: "В очікуванні",
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        if (!data.phone.trim()) {
            setIsLoading(false);
            console.log("Додайте хоч якийсь текст");
            return;
        }

        if (!data.comment.trim()) {
            setIsLoading(false);
            console.log("Додайте хоч якийсь текст");
            return;
        }
        const ratingData = { ...data, userId: user?.id, consult: consult };

        axios.post("/api/appointment", ratingData)
            .then(() => {
                console.log("Записано на консультацію");
                router.refresh();
                reset();
            })
            .catch((error) => {
                console.log("Упс", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    if (!user || !consult) return (
        <h1 className="w-full items-center text-center">
            <a href="/login" className="w-full items-center text-center">{isLoading ? "Загрузка" : "Увійти в аккаунт"}</a>
        </h1>
    );

    return ( <div>
        <div className="mb-5">
            <Input id="phone" type="number" label="Номер телефону" disabled={isLoading} register={register} errors={errors} required/>
        </div>
        <div className="mb-5">
            <Input id="comment" label="Комментарий" disabled={isLoading} register={register} errors={errors} required/>
        </div>
         {errors.comment && <span className="text-red-500">Додайте хоч якийсь текст</span>}
         <Button label={isLoading ? "Загрузка" : "Записатись на консультацію"} onClick={handleSubmit(onSubmit)}/></div> );
}
 
export default Appointment;