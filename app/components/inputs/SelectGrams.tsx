import React, { useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button";
import SelectPrice from "./SelectPrice";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { ImageType } from "@/app/admin/add-products/AddProductForm";

interface SelectGramsProps {
    item: ImageType;
    id: string;
    label: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    addImageToState: (value: ImageType) => void;
    removeImageFromState: (value: ImageType) => void;
    isProductCreated: boolean;
}

const SelectGrams: React.FC<SelectGramsProps> = ({ item, addImageToState, removeImageFromState, isProductCreated, id, label, disabled, required, register, errors }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    
    const handleFileChange = useCallback((value: File) => {
        setFile(value);
        addImageToState({ ...item, image: value });
    }, []);

    const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSelected(e.target.checked);

        if (!e.target.checked) {
            setFile(null);
            removeImageFromState(item);
        }
    }, []);

    const handlePriceChange = useCallback((value: number) => {
        setPrice(value);
        addImageToState({ ...item, price: value });
    }, []);

    useEffect(() => {
        if (isProductCreated) {
            setFile(null);
            setPrice(null);
            setIsSelected(false);
        }
    }, [isProductCreated]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
            <div className="flex flex-row gap-2 items-center h-[60px]">
                <input id={item.weight} type="checkbox" checked={isSelected} onChange={handleCheck} className="cursor-pointer" />
                <label htmlFor={item.weight} className="font-medium cursor-pointer">
                    {item.weight}
                </label>
            </div>
            {isSelected && !file && (
                <div className="col-span-2  text-center">
                    <div className="mb-2">
                        <SelectImage item={item} handleFileChange={handleFileChange} />
                    </div>
                </div>
            )}
            {file && (
                <div className="flex flex-col gap-2 text-sm col-span-1 item-center justify-between">
                    <p>{file?.name}</p>
                    <div className="w-70px">
                        <Button
                            label="Відміна"
                            small
                            outline
                            onClick={() => {
                                setFile(null);
                                setPrice(null);
                                removeImageFromState(item);
                            }}
                        />
                    </div>
                    <SelectPrice
                        id={id}
                        label={label}
                        disabled={disabled}
                        register={register}
                        errors={errors}
                        required={required}
                        handlePriceChange={handlePriceChange}
                    />
                </div>
            )}
        </div>
    );
};

export default SelectGrams;
