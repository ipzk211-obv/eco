import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import LoginForms from "./LoginForm";

const Login = async () => {
    const currentUser = await getCurrentUser()
    return ( 
        <Container>
            <FormWrap>
                <LoginForms currentUser={currentUser}/>
            </FormWrap>
        </Container>
     );
}
 
export default Login;