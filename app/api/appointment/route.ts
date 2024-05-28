import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {

    const currentUser = await getCurrentUser();
    
    if(!currentUser){
        return NextResponse.error()
    } 

    const body = await request.json();
    const {phone, comment, consult, status, userId} = body;

    const orderConsult = await prisma.orderConsult.create({
        data:{
            consultId: consult.id,
            userId,
            phone,
            comment,
            status,
        }
    })
    return NextResponse.json(orderConsult);
}