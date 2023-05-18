import { Prisma, Listas } from "@prisma/client";
import { IListaRepository } from "./listaRepositoryInterface";
import { prisma } from "../../lib/prisma";

export class ListaRepository implements IListaRepository {
    async deleteList(list_id: string): Promise<void> {
        const deleteList = await prisma.listas.delete({
            where:{
                list_id
            }
        })
    }
     async updateList(data: Prisma.ListasUpdateInput): Promise<Listas> {
        const { list_id } = data;
        const updatedList = await prisma.listas.update({
            where: { list_id: list_id as string},
            data
        });
        return updatedList;
    }

    async createList(data: Prisma.ListasCreateInput): Promise<Listas> {
        const list = await prisma.listas.create({
            data
        })
        return list
    }

    async getAllLists(user_id: string): Promise<Listas[] | undefined> {
        const user = await prisma.users.findUnique({
            where: { user_id },
            include: { listas: true }
        });
        const lists = user?.listas
        return lists
    }

    async getListById(list_id: string): Promise<Listas | null> {
        const list = await prisma.listas.findUnique({
            where:{
                list_id
            }
        })
        return list
    }


}