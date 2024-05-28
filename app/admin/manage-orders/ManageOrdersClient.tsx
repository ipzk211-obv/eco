"use client"

import {User, Order } from "@prisma/client";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Heading from "@/app/components/products/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import moment from "moment";
import "moment/locale/uk"; 
import { formatPrice } from "@/utils/formatPrice";

interface ManageOrdersClientProps{
    orders: ExtendedOrder[],
}
type ExtendedOrder = Order & {
    user: User
}
const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({orders}) => {
    moment.locale("uk");
    const router = useRouter();
    
    const [uniqueOrders, setUniqueOrders] = useState<ExtendedOrder[]>([]);
    useEffect(() => {
        if (orders) {
            const uniqueOrdersCopy = [...orders];
    
            for (let i = 0; i < uniqueOrdersCopy.length - 1; i++) {
                const currentDate = new Date(uniqueOrdersCopy[i].createDate);
                const nextDate = new Date(uniqueOrdersCopy[i + 1].createDate);                    
                    if (uniqueOrdersCopy[i].status !== "complete" && uniqueOrdersCopy[i + 1].status !== "complete" ) {
                        uniqueOrdersCopy.splice(i, 1);
                    } else if (uniqueOrdersCopy[i].status === "complete") {
                        uniqueOrdersCopy.splice(i + 1, 1);
                    } else {
                        uniqueOrdersCopy.splice(i, 1);
                    }
            }
            setUniqueOrders(uniqueOrdersCopy);
        }
    }, [orders]);
    
    
    
    
    let rows: any = [];
    if (uniqueOrders) {
        rows = uniqueOrders.map((order) => {
            return {
                id: order.id,
                customer: order.user.name,
                amount: formatPrice(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createDate).fromNow(),
                deliveryStatus: order.deliveryStatus,
            };
        });
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName:"ID", width:100},
        {field: 'customer', headerName:"Ім'я замовника", width:120},
        {field: 'amount', headerName:"Сума", width:100,
        renderCell: (params)=>{
            return ( <div>{params.row.amount} </div> )
        }},
        {field: 'paymentStatus', headerName:"Статус оплати", width:130, renderCell: (params)=>{
            return ( <div>{params.row.paymentStatus == "pending"  ?
                (<Status text="В очікуванні" icon={MdAccessTimeFilled} bg="bg-slate-500" color="text-white"/>)
                : params.row.paymentStatus == "complete" ?
                (<Status text="Завершено" icon={MdDone} bg="bg-green" color="text-white"/>)
                : <></>
            } </div> )
        }},
        {field: 'deliveryStatus', headerName:"Стан замовлення", width:130, renderCell: (params)=>{
            return ( <div>{params.row.deliveryStatus == "pending" ?
                (<Status text="В процесі" icon={MdAccessTimeFilled} bg="bg-slate-500" color="text-white"/>)
                : params.row.deliveryStatus == "dispatched" ?
                (<Status text="Відправлено" icon={MdDeliveryDining} bg="bg-orange-500" color="text-white"/>)
                : params.row.deliveryStatus == "delivered"  ?
                (<Status text="Доставлено" icon={MdDone} bg="bg-green" color="text-white"/>)
                : <></>
            } </div> )
        }},
        {
            field: 'date',
            headerName: "Дата замовлення",
            width: 150,
        },
        {field: 'action', headerName:"Додаткові дії", width:180, renderCell: (params)=>{
            return ( <div className="flex justify-between gap-4 w-full">
                <ActionBtn icon={MdDeliveryDining} onClick={()=>{
                    handleDispatch(params.row.id)
                }} />
                <ActionBtn icon={MdDone} onClick={()=>{
                    handleDeliver(params.row.id)
                }} />
                <ActionBtn icon={MdRemoveRedEye} onClick={()=>{
                    router.push(`/order/${params.row.id}`)
                }} />
                </div> )
        }},
    ]
    const handleDispatch = useCallback((id: string)=>{
        axios.put('/api/order',{
            id,
            deliveryStatus: "dispatched",
        }).then((res)=>{
            router.refresh()
        }).catch((error)=>{
            console.log(error);
        });
    },[]);

    const handleDeliver = useCallback((id: string)=>{
        axios.put('/api/order',{
            id,
            deliveryStatus: "delivered",
        }).then((res)=>{
            router.refresh()
        }).catch((error)=>{
            console.log(error);
        });
    },[]);

    
    return (
    <div className="max-w-[1200px] m-auto text-xl">
        <div className="mb-4 ">
            <Heading title="Редагування замовлень" center/>
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
 
export default ManageOrdersClient;