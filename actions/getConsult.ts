import prisma from "@/libs/prismadb";

export default async function getConsult() {
    try {
        const consults = await prisma.consult.findMany({
            include: {
                orderConsult: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createDate: "desc"
                    }
                }
            }
        });

        return consults;
    } catch (error: any) {
        throw new Error(error);
    }
}
