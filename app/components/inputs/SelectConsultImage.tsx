"use client"

import { ImageConsultType } from "@/app/admin/add-consult/AddConsult";
import { useCallback } from "react";
import {useDropzone} from 'react-dropzone'


interface SelectImageProps{
    item?: ImageConsultType;
    handleFileChange: (value: File) => void;
}
const SelectImage: React.FC<SelectImageProps> = ({item, handleFileChange}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
            if(acceptedFiles.length > 0){
                handleFileChange(acceptedFiles[0])
            }
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept:{'image/*': ['.jpeg', '.png']}})
    return ( <div {...getRootProps()} className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-500 flex items-center justify-center">
       <input {...getInputProps()} /> 
       {isDragActive ? (<p>Завантажити зображення тут...</p>) : (<p>+ Додайте зображення</p>)}
    </div> );
}
 
export default SelectImage;