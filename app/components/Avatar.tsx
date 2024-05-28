import React from "react";
import { HiOutlineUser } from "react-icons/hi";
interface AvatarProps{
    src?: string | null | undefined
}
const Avatar: React.FC<AvatarProps> = ({src}) => {
    if(src){
       return <img src={src} alt="Аватарка" className="rounded-full" height="30" width="30" />
    }
    return <HiOutlineUser size={28}/>;
}
 
export default Avatar;