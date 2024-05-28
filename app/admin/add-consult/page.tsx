import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import AddConsult from "./AddConsult";
    
const AddConsulting = async() => {
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
                        <AddConsult/>
                </FormWrap>
            </Container>
        </div> );
    }
export default AddConsulting;