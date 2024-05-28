"use client"
import React, { useEffect, useState } from "react";
import Input from "../components/inputs/Input";
import Heading from "../components/products/Heading";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
    currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // State для хранения ошибки
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push('/cart');
            router.refresh();
        }
    }, []);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (!isValidEmail(data.email)) {
            setError("Некоректний Email"); 
            return;
        }
        if (data.name.length < 6) {
            setError("Менше 6 символів для імені");
            return;
        }
        if (data.password.length < 6) {
            setError("Менше 6 символів для пароля"); 
            return;
        }

        setIsLoading(true);
        data.role = "USER";
        axios.post("/api/register", data)
            .then(() => {
                signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: false
                })
                .then((callback) => {
                    if (callback?.ok) {
                        router.push("/");
                        router.refresh();
                    }
                    if (callback?.error) {
                        setError(callback.error);
                    }
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
            })
            .catch((error) => {
                setError(error.message); 
                setIsLoading(false);
            });
    }

    const isValidEmail = (email: string) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    }

    if (currentUser) {
        return <p className="text-center">Авторизація...</p>;
    }

    return (
        <>
            <Heading title="Реєстрація" />
            <Button outline label="Реєстрація через Google" icon={AiOutlineGoogle} onClick={() => { signIn('google') }} />
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id="name"
                label="Ім'я"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Пароль"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            {error && <p className="text-red-500">{error}</p>} {/* Отображение ошибки */}
            <Button label={isLoading ? "Завантаження..." : "Зареєструватись"} onClick={handleSubmit(onSubmit)} />
            <p className="text-sm text-green">У вас уже є аккаунт? <a className="underline text-green" href="/login">Вхід</a></p>
        </>
    );
}

export default RegisterForm;
