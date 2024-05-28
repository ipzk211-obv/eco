import { getCurrentUser } from "@/actions/getCurrentUser";
import AdminNav from "../components/admin/AdminNav";

export const metadata ={
    title: "Eco SHOP",
    description: "Eco SHOP Адмін панель",
}

const AdminLayout = async ({children}: {children: React.ReactNode}) => {
    const curentUser = await getCurrentUser();

    return ( <div className="flex">
        <AdminNav currentUser={curentUser}/>
        <div className="w-full">
            {children}
        </div>
    </div> );
}
 
export default AdminLayout;