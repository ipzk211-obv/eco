"use client"

import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutClient = () => {
    const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    console.log();
    
    const router = useRouter();

    useEffect(() => {
            if (cartProducts) {
                setLoading(true);
                setError(false);

                fetch('/api/create-payment-intent', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            items: cartProducts,
                            payment_intent_id: paymentIntent
                        })
                    }).then((res)=>{
                        setLoading(false);
                        if (res.status === 401) {
                            return router.push('/login');
                        }
                        return res.json();
                    }).then ((data)=>{
                        setClientSecret(data.paymentIntent.client_secret);
                        handleSetPaymentIntent(data.paymentIntent.id);
                    }).catch ((error)=> {
                        setError(true);
                        console.log("error", error);
                })
            }
    }, [cartProducts, paymentIntent]);

    const options: StripeElementsOptions = {
        locale: 'en',
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating'
        }
    };

    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value);
    }, []);

    return (
        <div className="w-full">
            {clientSecret && cartProducts && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess} />
                </Elements>
            )}
            {loading && <div className="text-center">Завантаження...</div>}
            {error && <div className="text-center text-rose-500">Помилка...</div>}
            {paymentSuccess && (
                <div className="flex items-center flex-col gap-4">
                    <div className="text-teal-500 text-center">Покупка успішна</div>
                    <div className="max-w-[220px] w-full">
                        <Button label="Переглянути замовлення" onClick={() => router.push('/orders')} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutClient;