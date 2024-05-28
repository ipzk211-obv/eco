import prisma from "@/libs/prismadb";

interface IParams {
    consultId?: string;
}

export default async function getConsultById(params: IParams) {
    try {
        const {consultId} = params;
        const consult = await prisma.consult.findUnique({
            where: {
                id: consultId
            },
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

        if (!consult) {
            return null;
        }
        return consult;
    } catch (error: any) {
        throw new Error(error);
    }
}
