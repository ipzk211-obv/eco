import Container from "@/app/components/Container";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface IPrams{
    orderId: string;
}
const Order  = async ({params}: {params: IPrams}) => {
    const order = await getOrderById(params);

    if(!order) return <NullData title="Немає замовлень"></NullData>
    return (  
    <div>
        <Container>
            <OrderDetails order={order}/>
            <div className="flex flex-col mt-20 gap-4 text-green">
                <div></div>
            </div>
        </Container>
    </div>);
}
 
export default Order;