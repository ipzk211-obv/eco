import getProducts from "@/actions/getProduct";
import Summary from "./Summary";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Admin = async () => {
    const curentUser = await getCurrentUser();
    const products = await getProducts({category: null})
    const orders = await getOrders()
    const users = await getUsers()
    const graphData = await getGraphData()
    
    return ( <div className="pt-8">
        <Container>
            <Summary currentUser={curentUser} products={products} orders={orders} users={users}/>
            <div className="mt-4 mx-auto max-w-[1150px]">
                <BarGraph data={graphData} currentUser={curentUser}/>
            </div>
        </Container>
    </div> );
}
 
export default Admin;