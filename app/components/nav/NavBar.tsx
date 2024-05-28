import Link from "next/link";
import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import BurgerButton from "../inputs/BurgerButton";
const NavBar = async () => {
    const curentUser = await getCurrentUser();
    
    return ( 
    <div className="
    sticky
    top-0
    w-full
    bg-bg
    z-30
    shadow-sm
    ">
        <div className="py-2">
            <Container>
                <div className="flex items-center justify-between gap-3 md-gap-0">
                    <a href="/">
                        <img className=" ml-2 mr-2 w-20 h-auto" src="/logo.png" alt="Логотип" />
                    </a>
                    <div className="sm:hidden">
                        <ul className="flex items-center gap-[30px]">
                            <li><a href="/" className="relative font-medium text-[16px] leading-[22px] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-white after:scale-0 hover:after:scale-100 after:transition-transform">Головна</a></li>
                            <li><a href="/catalog" className="relative font-medium text-[16px] leading-[22px] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-white after:scale-0 hover:after:scale-100 after:transition-transform">Каталог</a></li>
                            <li><a href="/consult" className="relative font-medium text-[16px] leading-[22px] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-white after:scale-0 hover:after:scale-100 after:transition-transform">Експерти</a></li>
                            <li><a href="/about" className="relative font-medium text-[16px] leading-[22px] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-white after:scale-0 hover:after:scale-100 after:transition-transform">Про нас</a></li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-3 md:hidden">
                        <CartCount/>
                        <div className="mr-3"></div>
                        <UserMenu currentUser={curentUser}/>
                    </div>
                    <BurgerButton/>
                </div>
            </Container>
        </div>
    </div>);
}
 
export default NavBar;