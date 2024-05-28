"use client"

import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import Heading from "@/app/components/products/Heading";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SelectImageConsult from "@/app/components/inputs/SelectImageConsult";
import Button from "@/app/components/Button";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import axios from "axios";
import { MdPassword } from "react-icons/md";


export type ImageConsultType = {
    image: File | null,
}
export type UploadedImageConsultType = {
    image: string,
}

const AddConsult = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<ImageConsultType>({ image: null });
    const [isConsultCreated, setIsConsultCreated] = useState(false);
    const router = useRouter()

    const {register, handleSubmit, setValue, watch, reset, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name: "",
            fullName: "",
            profession: "",
            initialConsult: "",
            monthConsult: "",
            description1: "",
            description2: "",
            image: "",
            email: "",
            password: "",
        }
    });
    
    useEffect(()=>{
        if(isConsultCreated){
            reset();
            setImage({ image: null });
            setIsConsultCreated(false);
        }

     }, [isConsultCreated])
     const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        setIsLoading(true);
        let uploadedImages: string[] = []; 
        if (!image || !image.image) {
            setIsLoading(false);
            console.log("No selected image");
            return;
        }
        console.log("Створюється продукт, зачекайте...");
        try {
            const fileName = new Date().getTime() + "-" + image.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `consult/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, image.image);
            
            await new Promise<void>((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Завантаження ' + progress + '% виконано');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Завантаження призупинено');
                                break;
                            case 'running':
                                console.log('Виконується завантаження');
                                break;
                        }
                    },
                    (error) => {
                        console.log("Помилка завантаження", error);
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                uploadedImages.push(downloadURL);
                                console.log('Файл доступний за посилання', downloadURL);
                                resolve();
                            })
                            .catch((error) => {
                                console.log('Помилка отримання URL-адреси завантаження', error);
                                reject(error);
                            });
                    }
                    
                );
            });
            
            const consultData = { ...data, image: uploadedImages[0] };

            
            axios.post('/api/consult', consultData).then(()=>{
                setIsConsultCreated(true);
                router.refresh();
            }).catch((error)=>{
                console.log("помилка щодо збереження бази даних");  
            }).finally(()=>{
                reset();
                setIsLoading(false);
                
            })  
            const { password, name, email, role } = data;

            const newData = {
                password,
                name,
                email,
                role,
            };
            newData.role = 'EXPERT'; 
            axios.post('/api/register', newData)
                .then(() => {
                    router.refresh();
                })
                .catch((error) => {
                    console.log("Помилка збереження експерта", error);
                })
                .finally(() => {
                    reset();
                    setIsLoading(false);
                }); 
        } catch(error) {
            setIsLoading(false);
            console.log("Помилка обробки завантаження", error);
            return;
        }
        
    };
    
    
    
    return ( 
    <>
    <Heading title="Додати експерта" center/>
    <Input id="name"
    label="Ім'я англіською" disabled={isLoading} register={register} errors={errors} required/>
    <Input id="email"
    label="Email" disabled={isLoading} register={register} errors={errors} required/>
    <Input id="password"
    label="Пароль" disabled={isLoading} register={register} errors={errors} required/>
    <Input id="fullName"
    label="Повне ім'я" disabled={isLoading} register={register} errors={errors} required/>
    <TextArea id="profession"
    label="Спеціальність" disabled={isLoading} register={register} errors={errors} required/>
    <Input id="initialConsult" type="number"
    label="Первинна консультація в грн" disabled={isLoading} register={register} errors={errors} required/>
    <Input id="monthConsult" type="number"
    label="30-денна індивідуальна програма в грн" disabled={isLoading} register={register} errors={errors} required/>
    <TextArea id="description1"
    label="Опис індивідуальної програми" disabled={isLoading} register={register} errors={errors} required/>
     <TextArea id="description2"
    label="Додаткові послуги" disabled={isLoading} register={register} errors={errors} required/>
    
    <div>
        <SelectImageConsult item={image} setImage={setImage} isConsultCreated={isConsultCreated}/>
    </div>
    
    <Button label={isLoading ? "Завантаження": "Додати експерта"} onClick={handleSubmit(onSubmit)}/>
    </>
    );
}
 
export default AddConsult;