"use client"
import { on } from "events";
import React from "react";
import { IconType } from "react-icons";

interface ButtonProps{
    label: string,
    disabled?: boolean,
    outline?: boolean,
    small?: boolean,
    custom?: string,
    icon?: IconType,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<ButtonProps> = ({label, disabled,outline, small,custom,icon: Icon, onClick}) => {
    return (
    <button onClick={onClick} disabled={disabled} className={`disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-md
    hover:opacity-80
    transition
    w-full
    text-white
    flex
    iteam-center
    justify-center
    gap-2 
    bg-bg
    ${outline? "bg-white":"bg-bg"}
    ${outline? "text-slate-700": "text-white"}
    ${small? "text-sm font-light":"text-md font-semibold"}
    ${small? "py-1 px-2 border-[1px]":"py-3 px-4 border-2"}
    ${custom? custom : ''}
    `}>{Icon && <Icon size={24}/>}{label}</button>  );
}
 
export default Button;