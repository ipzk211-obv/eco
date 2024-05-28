import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {

    const currentUser = await getCurrentUser();
    
    if(!currentUser){
        return NextResponse.error()
    } 

    if(currentUser.role !== 'ADMIN'){
        return NextResponse.error()
    } 

    const body = await request.json();
    const {name, fullName, profession, initialConsult, monthConsult, description1, description2, image, hashedPassword, email} = body;

    const consult = await prisma.consult.create({
        data:{
            name,
            fullName,
            profession,
            initialConsult,
            monthConsult,
            description1,
            description2,
            image,
            hashedPassword,
            email,
        }
    })
    return NextResponse.json(consult);
}