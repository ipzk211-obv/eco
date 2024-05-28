"use client"

import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface SelectProps {
    id: string,
    label: string,
    options: string[],
    disabled?: boolean,
    required?: boolean,
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
}

const Select: React.FC<SelectProps> = ({ id, label, options, disabled, required, register, errors }) => {
    return (
        <div className="w-full relative text-green">
            <select
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed
                ${errors[id] ? "border-rose-400" : "border-slate-300"}
                ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"}`}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            <label
                className={`absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 orpgin-[0] left-4  mb-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
                ${errors[id] ? "text-rose-500" : "text-slate-400"}
                `}
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    );
}

export default Select;
