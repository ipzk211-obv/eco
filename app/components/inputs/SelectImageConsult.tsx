import { ImageConsultType } from "@/app/admin/add-consult/AddConsult";
import { useCallback, useEffect, useState } from "react";
import SelectConsultImage from "./SelectConsultImage";
import Button from "../Button";

interface SelectImageConsultProps {
    item: ImageConsultType;
    setImage: (value: ImageConsultType) => void;
    isConsultCreated: boolean;
}

const SelectImageConsult:React.FC<SelectImageConsultProps> = ({ item, setImage, isConsultCreated }) => {
    
    const handleFileChange = useCallback((value: File) => {
        setImage({ ...item, image: value });
    }, [item, setImage]);
    
    
    return ( <div>
        <div className="grid grid-cols-1 md:grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
            {!item.image && (
                <div className="col-span-2  text-center">
                    <div className="mb-2">
                        <SelectConsultImage handleFileChange={handleFileChange} />
                    </div>
                </div>
            )}
            {item.image && (
                <div className="flex flex-col gap-2 text-sm col-span-1 item-center justify-between">
                    <p>{item.image?.name}</p>
                    <div className="w-70px">
                        <Button
                            label="Відміна"
                            small
                            outline
                            onClick={() => {
                                setImage({ image: null });
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    </div> );
}
 
export default SelectImageConsult;