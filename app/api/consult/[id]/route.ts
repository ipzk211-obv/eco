import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    try {
        const userIdToDelete = params.id;
        
        const deletedOrderConsults = await prisma?.orderConsult.deleteMany({
            where: { userId: userIdToDelete }
        });

        return NextResponse.json(deletedOrderConsults);
    } catch (error) {
        console.error("Error deleting review:", error);
        return NextResponse.error();
    }
}
