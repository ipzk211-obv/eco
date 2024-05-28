"use client"

import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import SelectGrams from "@/app/components/inputs/SelectGrams";
import TextArea from "@/app/components/inputs/TextArea";
import Heading from "@/app/components/products/Heading";
import { categories } from "@/utils/Categories";
import { grams } from "@/utils/Grams";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/Button";
import firebaseApp from "@/libs/firebase";
import {getStorage, uploadBytesResumable, ref, getDownloadURL} from 'firebase/storage'
import axios from "axios";
import { useRouter } from "next/navigation";
import Select from "@/app/components/inputs/Select";

export type ImageType = {
    price: number,
    weight: string,
    image: File | null,
}
export type UploadedImageType = {
    price: number,
    weight: string,
    image: string,
}

const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState<ImageType[] | null>()
    const [isProductCreated, setIsProductCreated] = useState(false)
    const router = useRouter()
    
    const {register, handleSubmit, setValue, watch, reset, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name: "",
            description: "",
            charity: "",
            category: "",
            inStock: false,
            images: []
        }
    });

    useEffect(()=>{
       setCustomValue("images", images)           
    }, [images])

    useEffect(()=>{
        if(isProductCreated){
            reset();
            setImages(null);
            setIsProductCreated(false);
        }
     }, [isProductCreated])

    const onSubmit: SubmitHandler<FieldValues> = async(data) =>{
        setIsLoading(true);
        let uploadedImages: UploadedImageType[] = []
        
        if(!data.category){
            setIsLoading(false)
            return console.log("category is not selected")
        }
        if(!data.images || data.images.length == 0){
            setIsLoading(false)
            return console.log("no selected image")
        }
        const handleImageUploads = async ()=>{
            console.log("Створюється продукт, зачекайте...");
            try{
                for(const item of data.images){
                    if(item.image){
                        const fileName = new Date().getTime() + "-" + item.image.name;
                        const storage = getStorage(firebaseApp)
                        const storageRef = ref(storage, `products/${fileName}`);
                        const uploadTask = uploadBytesResumable(storageRef, item.image);

                        await new Promise<void>((resolve, reject)=>{
                            uploadTask.on(
                                'state_changed',
                                (snapshot) =>{
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    switch (snapshot.state) {
                                    case 'paused':
                                        // console.log('Upload is paused');
                                        break;
                                    case 'running':
                                        // console.log('Upload is running');
                                        break;
                                    }
                                },
                                (error) => {
                                    // console.log("error uploading", error);
                                    reject(error)
                                }, 
                                () => {
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push({
                                            ...item,
                                            image: downloadURL
                                        })
                                        console.log('File available at', downloadURL);
                                        resolve()
                                    }).catch((errors)=>{
                                        console.log('error getting the down url', errors);
                                        reject(errors);
                                    })
                                }
                            )
                        })
                    }
                }
            }catch(error){
                reset();
                setIsLoading(false)
                console.log("Error handing update", error);
                return;
            }
        }
        await handleImageUploads();
        const productData = {...data, images: uploadedImages}
        console.log(productData);
        
        axios.post('/api/product', productData).then(()=>{
            setIsProductCreated(true);
            router.refresh();
        }).catch((error)=>{
            console.log("eror db saving prod");  
        }).finally(()=>{
            reset();
            setIsLoading(false);
            
        })
    }

    const category = watch('category');

    const setCustomValue = (id: string, value: any) =>{
        setValue(id,value,{
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }
    const addImageToState = useCallback((value: ImageType)=> {
        setImages((prev)=>{    
            if(!prev){
                return [value];
            }
            const existingImageIndex = prev.findIndex(item => item.weight === value.weight);
            if(existingImageIndex !== -1) {
                const updatedImages = [...prev];
                updatedImages[existingImageIndex] = {
                    ...prev[existingImageIndex],
                    price: value.price,
                };
                return updatedImages;
            }

            const newImages = [...prev, value];
            return newImages;
        });
    }, []);
    
    const removeImageFromState = useCallback((value: ImageType)=> {
        setImages((prev)=>{
            if(prev){
                const filteredImages = prev.filter(
                    (item) => item.weight !== value.weight
                )
                return filteredImages;
            }
            return prev;
        })
    }, [])
    return ( 
    <>
        <Heading title="Додати товар" center/>
        <Input id="name"
        label="Назва"
        disabled={isLoading}
        register={register}
        errors={errors}
        required/>

        <TextArea id="description"
        label="Опис"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <CustomCheckbox id="inStock" register={register} label="Цей товар є в наявності"/>
        <div className="w-full font-medium text-green">
            <div className="mb-2 font-semibold">Вибір категорії</div>
            <div className="grid gap-3  grid-cols-2 md:grid-cols-2 max-h-[50vh] overflow-y-auto">
                {categories.map((item)=>{
                    if(item.label == "Всі товари"){
                        return null;
                    }
                    return <div key={item.label} className="col-span">
                        <CategoryInput onClick={(category)=> setCustomValue('category', category)} selected={category == item.label}
                        label={item.label}
                        icon={item.icon}
                        />
                    </div>
                })}
            </div>
        </div>
        <div className="w-full flex-col flex-wrap gap-4 text-green">
            <div>
                <div className="font-bold">
                Виберіть доступну вагу продукту завантажте їх зображення та ціну.
                </div>
                <div className="text=sm">
                    Ви повинні написати ціну для кожної вибраної ваги, інакше ваш вибір буде проігноровано.
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {grams.map((item, index) => {
                    return (
                        <div key={`${item.weight}-${index}`}>
                            <SelectGrams  item={item} addImageToState={addImageToState} removeImageFromState={removeImageFromState} isProductCreated={isProductCreated} id={`price-${index}`} label="Введіть ціну" disabled={isLoading} register={register} errors={errors} required/>
                        </div>
                    );
                })}
            </div>
        </div>
        <div className="w-full font-medium">
        <div className=" mb-5 font-bold text-green">
            Виберіть блігодійний фонд(25% піде саме туди).
        </div>

        <Select
            id="charity"
            label="Фонд"
            options={["Зелена Спільнота", "Промінь Чистоти"]}
            register={register}
            errors={errors}
            required
        />
        </div>
        <Button label={isLoading ? "Завантаження": "Додати товар"} onClick={handleSubmit(onSubmit)}/>
    </> );
}
 
export default AddProductForm;
