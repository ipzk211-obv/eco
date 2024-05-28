import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const {name, email, password, role} = body;

    const hashedPassword = await bcrypt.hash(password, 10);

        let userData = {
            name,
            email,
            hashedPassword,
            role
        };

        if (role && role.toUpperCase() === 'EXPERT') {
            userData.role = 'EXPERT';
        }
        if (role && role.toUpperCase() === 'USER') {
            userData.role = 'USER';
        }
        const user = await prisma.user.create({
            data: userData
        });
        return NextResponse.json(user);
}