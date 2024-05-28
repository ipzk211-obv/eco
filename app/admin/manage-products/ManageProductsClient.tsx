"use client"

import { Product } from "@prisma/client";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Heading from "@/app/components/products/Heading";
import Status from "@/app/components/Status";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";

interface ManageProductsClientProps{
    products: Product[],
}
const ManageProductsClient: React.FC<ManageProductsClientProps> = ({products}) => {
    const router = useRouter();
    const storage = getStorage(firebaseApp);
    let rows: any = []
    if(products){
        rows = products.map((product) =>{
            return{
                id: product.id,
                name: product.name,
                category: product.category,
                inStock: product.inStock,
                images: product.images
            }
        })
    }
    const columns: GridColDef[] = [
        {field: 'id', headerName:"ID", width:120},
        {field: 'name', headerName:"Назва", width:200},
        {field: 'category', headerName:"Категорія", width:180},
        {field: 'inStock', headerName:"В наявності", width:180, renderCell: (params)=>{
            return ( <div>{params.row.inStock == true ? <Status text="В наявності" icon={MdDone} bg="bg-green" color="text-white"/> : <Status text="Немає в наявності" icon={MdClose} bg="bg-rose-900" color="text-white"/>} </div> )
        }},
        {field: 'action', headerName:"Додаткові дії", width:180, renderCell: (params)=>{
            return ( <div className="flex justify-between gap-4 w-full">
                <ActionBtn icon={MdCached} onClick={()=>{
                    handleToggleStock(params.row.id, params.row.inStock)
                }} />
                <ActionBtn icon={MdDelete} onClick={()=>{
                    handleDelete(params.row.id, params.row.images)
                }} />
                <ActionBtn icon={MdRemoveRedEye} onClick={()=>{
                    router.push(`/product/${params.row.id}`)
                }} />
                </div> )
        }},
    ]
    const handleToggleStock = useCallback((id: string, inStock: boolean)=>{
        axios.put('/api/product',{
            id,
            inStock: !inStock
        }).then((res)=>{
            router.refresh()
        }).catch((error)=>{
            console.log(error);
        });
    },[]);
    const handleDelete = useCallback(async(id: string, images: any[])=>{
        const handleImageDelete = async()=>{
            try{
                for(const item of images){
                    if(item.image){
                        const imageRef = ref(storage, item.image)
                        await deleteObject(imageRef)
                        console.log("img deleted");
                        
                    }
                }
            }catch(error){
                return console.log(error);
            }
        }
        await handleImageDelete()
        axios.delete(`/api/product/${id}`).then((res)=>{
            router.refresh()
        }).catch((error)=>{
            console.log(error);
        });
    },[])
    return (
    <div className="max-w-[1200px] m-auto text-xl">
        <div className="mb-4">
            <Heading title="Редагування товару" center/>
        </div>
        <div style={{height: 600, width: "100%"}}>
            <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                paginationModel: { page: 0, pageSize: 9 },
                },
            }}
            pageSizeOptions={[9, 20]}
            checkboxSelection
            disableRowSelectionOnClick
            />
        </div>
    </div> );
}
 
export default ManageProductsClient;