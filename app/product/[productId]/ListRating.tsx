"use client";

import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/products/Heading";
import { Rating } from "@mui/material";
import moment from "moment";

interface ListRatingProps{
    product: any;
}
const ListRating: React.FC<ListRatingProps> = ({product}) => {
    if(product.reviews.length == 0) return null
    return ( 
    <div>
        <Heading title="Відгуки"/>
        <div className="text-sm mt-2 text-green">
            {product.reviews && product.reviews.map((reviw: any)=>{
                return <div key={reviw.id} className="max-w-300px">
                    <div className="flex gap-2 items-center">
                        <Avatar src={reviw?.user.image}/>
                        <div className="font-semibold">{reviw?.user.name}</div>
                        <div className="font-light">{moment(reviw.createDate).fromNow()}</div>
                    </div>
                    <div className="mt-2">
                        <Rating value={reviw.rating} readOnly/>
                        <div className="ml-2">
                            {reviw.comment}
                        </div>
                        <hr className="mt-4"/>
                    </div>
                </div>
            })}
        </div>
    </div> );
}
 
export default ListRating;