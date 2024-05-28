import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function PUT(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { id, email, name } = body;


    const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
            email: email,
            name: name,
        }
    });

    return NextResponse.json(updatedUser);
}
