"use client"

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Heading from "../components/products/Heading";
import Button from "../components/Button";

interface CheckoutFormProps{
    clientSecret: string,
    handleSetPaymentSuccess: (value: boolean) => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({clientSecret, handleSetPaymentSuccess}) => {
    const {cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart()
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false); 
    const formattedPrice = formatPrice(cartTotalAmount);
    
    useEffect(()=>{
        if(!stripe){
            return
        }
        if(!clientSecret){
            return
        }
        handleSetPaymentSuccess(false);
    }, [stripe])

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();
        if(!stripe || !elements){
            return
        }
        setIsLoading(true)

        stripe.confirmPayment({
            elements, redirect: 'if_required'
        }).then(result =>{
            if(!result.error){
                handleClearCart()
                handleSetPaymentSuccess(true)
                handleSetPaymentIntent(null)
            }
            setIsLoading(false)
        })
    }
    
    return ( <form onSubmit={handleSubmit} id="форма-оплати">
        <div className="mb-6">
            <Heading title="Введіть свої дані, щоб завершити замовлення"/>
            <h2 className="font-semibold mb-2 mt-2"> Адресна інформація</h2>
            <AddressElement options={{
                mode: 'shipping',
                allowedCountries: ["UA"]
            }}/>
            <h2 className="font-semibold mt-4 mb-2">Платіжна інформація</h2>
            <PaymentElement id="payment-element" options={{layout:"tabs"}}/>
           <div className="py-4 text-center text-slate-700 text-4xl font-bold">
                Всього: {formattedPrice}
            </div> 
            <Button label={isLoading? 'Завантаження':'Оплата'} disabled={isLoading || !stripe || !elements} onClick={()=> {}}/>
        </div>
    </form> );
}
 
export default CheckoutForm;