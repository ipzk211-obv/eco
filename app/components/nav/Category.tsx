"use client"
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryProps{
    lable: string;
    icon: IconType,
    selected?: boolean,
}
const Category:React.FC<CategoryProps> = ({lable, icon:Icon, selected}) => {
    const router = useRouter();
    const params = useSearchParams()
    const handleClick = useCallback(()=> {
        if(lable == "Всі товари"){
            router.push('/catalog');
        }else{
            let currentQuery={};
            if(params){
                currentQuery = queryString.parse(params.toString())
            }
            const updateQuery:any ={
                ...currentQuery,
                category: lable
            }
            const url = queryString.stringifyUrl({
                url: "/catalog",
                query: updateQuery
            },
            {
                skipNull: true
            })
            router.push(url)
        }
    }, [lable, params, router])
    return ( 
    <div onClick={handleClick} className={`flex items-center justify-center text-green bg-white rounded-md m-1  00 text-center gap-1 p-2  border-b-2 hover:text-slate-400 transition cursor-pointer ${selected ? "border-green text-green" : "border-transparent text-black"}`}>
        <Icon size={20}/>
        <div className="font-medium text-sm p-1">{lable}</div>
    </div> );
}
 
export default Category;