"use client"

import AdminNavItem from "./AdminNavItem";
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Container from "../Container";
import { SafeUser } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SafeUserProps{

    currentUser: SafeUser | null;
}

const AdminNav: React.FC<SafeUserProps> = ({ currentUser}) => {
    const pathname = usePathname();
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(true); 

    useEffect(() => {
        if (currentUser == null || currentUser.role !== "ADMIN") {
            router.push('/');
        } else {
            setRedirecting(false); 
        }
    }, [currentUser, router]);

    if (redirecting) {
        return null;
    }
    return ( 
    <div className="min-w-[200px] shadow-sm border-[1px] pt-4">
        <Container>
            <div className="w-full flex flex-col items-start justify-between gap-5 overflow-x-auto">
                <Link href="/admin" className="w-full">
                    <AdminNavItem label="Головна" icon={MdDashboard} selected={pathname == "/admin"}/>
                </Link>
                <Link href="/admin/add-products" className="w-full">
                    <AdminNavItem label="Додати товар" icon={MdLibraryAdd} selected={pathname == "/admin/add-products"}/>
                </Link>
                <Link href="/admin/add-consult" className="w-full">
                    <AdminNavItem label="Додати експерта" icon={MdLibraryAdd} selected={pathname == "/admin/add-consult"}/>
                </Link>
                <Link href="/admin/manage-products" className="w-full">
                    <AdminNavItem label="Редагування товару" icon={MdDns} selected={pathname == "/admin/manage-products"}/>
                </Link>
                <Link href="/admin/manage-orders" className="w-full">
                    <AdminNavItem label="Редагування замовлень" icon={MdFormatListBulleted} selected={pathname == "/admin/manage-orders"}/>
                </Link>
            </div>
        </Container>
    </div> );
}
 
export default AdminNav;