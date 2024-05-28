import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";
import getConsult from "@/actions/getConsult";
import getOrdersByExpert from "@/actions/getOrdersByExpert";
import Heading from "../components/products/Heading";

const Expert = async () => {
    const currentUser = await getCurrentUser();
    const consults = await getConsult();
    const orders = await getOrdersByExpert();
    
    if (!currentUser) {
        return <NullData title="Увійдіть щоб переглянути редагувати профіль!" />;
    }

    const phoneElements = [];

    for (const consult of consults) {
        if (consult.email === currentUser.email) {
            for (const order of orders) {
                if (consult.id === order.consultId) {
                    phoneElements.push(
                    <div className="text-green flex justify-between items-center w-full border-b-2  border-green" key={order.id}>
                        <p className="flex-1">{order.id}</p>
                        <p className="flex-1">{order.phone}</p>
                        <p className="flex-1">{order.comment}</p>
                        <p className="flex-1">{order.status}</p>
                        <p className="flex-1">{order.createDate.toLocaleString()}</p>
                    </div>
                    );
                }
            }
        }
    }

    return ( <div className="pt-2 text-center"> 
        <Heading title="Ваші клієнти"/>
        <div>{phoneElements.length > 0 ? 
        <div>
            <div className=" font-bold bg-bg text-white mt-4 flex justify-between items-center w-full border-b-2 border-green">
                <p className="flex-1 ">ID</p>
                <p className="flex-1">Номер телефона</p>
                <p className="flex-1">Коментар</p>
                <p className="flex-1">Статус</p>
                <p className="flex-1">Дата</p>
            </div>
            <div>{phoneElements}</div>
        </div> : <div>Немає замовлень</div>}</div>
        </div> );
};

export default Expert;
