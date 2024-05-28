import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import AddProductForm from "./AddProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const AddProducts = async() => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return <NullData title="Ой, вам сюди не можна!"/>
    } 

    if(currentUser.role !== 'ADMIN'){
        return <NullData title="Ой, вам сюди не можна!"/>
    } 
    return ( <div className="px-8">
        <Container>
            <FormWrap>
                <AddProductForm/>
            </FormWrap>
        </Container>
    </div> );
}
 
export default AddProducts;