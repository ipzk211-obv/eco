"use client"

import { useEffect, useState } from "react";
import Input from "../components/inputs/Input";
import Heading from "../components/products/Heading";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface LoginFormProps {
    currentUser: SafeUser | null
}
const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null); 
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const router = useRouter()
    useEffect(() => {
        if (currentUser) {
            router.push('/cart')
            router.refresh()
        }
    }, [])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false)

            if (callback?.ok) {
                router.push("/");
                router.refresh();
            }
            if (callback?.error) {
                console.error("Помилка:", callback.error);
                setErrorMessage("Некоректний email або пароль"); 
            }
        })
    }
    if (currentUser) {
        return <p className="text-center">Авторизація...</p>
    }
    return (
        <>
            <Heading title="Вхід" />
            <Button outline label="Вхід через Google" icon={AiOutlineGoogle} onClick={() => { signIn('google') }} />
            <hr className="bg-slate-300 w-full h-px" />
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label="Пароль" disabled={isLoading} register={register} errors={errors} required type="password" />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>} 
            <Button label={isLoading ? "Завантаження..." : "Вхід"} onClick={handleSubmit(onSubmit)} />
            <p className="text-sm text-green">У вас немає аккаунту? <a className="underline text-green" href="/register">Зареєструватись</a></p>
        </>
    );
}

export default LoginForm;