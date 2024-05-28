"use client"

import { ChangeEvent } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectPriceProps {
    id: string;
    label: string;
    disabled?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    required?: boolean;
    handlePriceChange: (value: number) => void;
}

const SelectPrice: React.FC<SelectPriceProps> = ({ id, label, disabled, register, errors, required, handlePriceChange }) => {
    return (
        <div className="">
            <label htmlFor={id}>{label}</label>
            <input placeholder="Ціна" className="peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed"
                id={id}
                type="number"
                disabled={disabled}
                {...register(id)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceChange(parseFloat(e.target.value))}
                required={required}
            />
        </div>
    );
};

export default SelectPrice;
