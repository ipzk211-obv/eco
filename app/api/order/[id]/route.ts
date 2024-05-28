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
        
        const deletedOrders = await prisma?.order.deleteMany({
            where: { userId: userIdToDelete }
        });

        return NextResponse.json(deletedOrders);
    } catch (error) {
        console.error("Error deleting orders:", error);
        return NextResponse.error();
    }
}
