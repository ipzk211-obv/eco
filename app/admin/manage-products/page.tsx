import Container from "@/app/components/Container";
import ManageProductsClient from "./ManageProductsClient";
import getPrdoducts from "@/actions/getProduct";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const ManageProducts =  async () => {
    const products = await getPrdoducts({category: null})
    const currentUser = await getCurrentUser()

   if(!currentUser){
        return <NullData title="Ой, вам сюди не можна!"/>
    } 

    if(currentUser.role !== 'ADMIN'){
        return <NullData title="Ой, вам сюди не можна!"/>
    } 

    return ( <div className="pt-8">
        <Container>
            <ManageProductsClient products={products}/>
        </Container>
        </div> );
}
 
export default ManageProducts;