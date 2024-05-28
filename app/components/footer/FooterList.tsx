import { Children } from "react";

interface FooterListProps{
    children: React.ReactNode;
}
const FooterList: React.FC<FooterListProps> = ({children}) => {
    return ( <div className="w-full md:items-center md:mx-0 mb-6 mx-5 flex flex-col gap-3">{children}</div> );
}
 
export default FooterList;