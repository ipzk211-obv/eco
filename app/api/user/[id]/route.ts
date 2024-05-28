import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    {params}: {params: {id: string}}
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error()
    } 
    const user = await prisma?.user.delete({
        where: {id: params.id}
    })

    return NextResponse.json(user);
}
