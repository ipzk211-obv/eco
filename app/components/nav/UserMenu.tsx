"use client"

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { User } from "@prisma/client";
import { SafeUser } from "@/types";

interface UserMenuProps{
    currentUser: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(()=>{
        setIsOpen((prev)=> !prev);
    }, [])
    
    return ( 
    <>
    <div className="relative z-30">
        <div onClick={toggleOpen} className="p-1 border-[1px] hover:border-[1px] border-green flex flex-row items-center gap-1 rounded-md cursor-pointer hover:shadow-md transition ">
            <Avatar src={currentUser?.image}/>
            <AiFillCaretDown/>
        </div>
        {isOpen && (
            <div className="absolute rounded-md shadow-md w-[170px] bg-green overflow-hidden right-0 top-12 twxt-sm flex flex-col cursor-pointer">
                {currentUser?   
                <div>
                    <div>
                    <a href="/profile"><MenuItem onClick={toggleOpen}>Ваші дані</MenuItem></a>
                        <a href="/orders"><MenuItem onClick={toggleOpen}>Замовлення</MenuItem></a>
                        {currentUser.role === "ADMIN" ?
                            <a href="/admin"><MenuItem onClick={toggleOpen}>Адмін панель</MenuItem></a>: <></>
                        }
                        {currentUser.role === "EXPERT" ?
                            <a href="/expert"><MenuItem onClick={toggleOpen}>Адмін панель</MenuItem></a>: <></>
                        }
                        <MenuItem onClick={()=>{
                            toggleOpen();
                            signOut();
                        }}>Вийти</MenuItem>
                    </div>
                </div>
                    : 
                <div>
                    <a href="/login"><MenuItem onClick={toggleOpen}>Вхід</MenuItem></a>
                    <a href="/register"><MenuItem onClick={toggleOpen}>Реєстрація</MenuItem></a>
                </div>    
                }
            </div>
        )}
    </div>
    {isOpen ? <BackDrop onClick={toggleOpen}/> : null}
    </> );
}
 
export default UserMenu;