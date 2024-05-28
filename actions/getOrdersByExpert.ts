import prisma from "@/libs/prismadb"

export default async function getOrdersByExpert(){
    try{
        const orderConsults = prisma?.orderConsult.findMany()

        return orderConsults
    }catch (error: any){
        throw new Error(error)
    }
}