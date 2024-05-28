import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import ProfileForm from "./ProfileForm";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import NullData from "../components/NullData";

const Login = async () => {
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return <NullData title="Увійдіть щоб переглянути редагувати профіль!"/>
    }
    const orders = await getOrdersByUserId(currentUser.id)
    return ( 
        <Container>
            <FormWrap>
                    <ProfileForm currentUser={currentUser} orders={orders}/>
            </FormWrap>
        </Container>
     );
}
 
export default Login;