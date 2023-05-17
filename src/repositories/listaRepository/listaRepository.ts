import { Prisma, Listas } from "@prisma/client";
import { IListaRepository } from "./listaRepositoryInterface";
import { prisma } from "../../lib/prisma";

export class ListaRepository implements IListaRepository {
    async getAllLists(user_id: string): Promise<Listas[] | undefined> {
        const user = await prisma.users.findUnique({
            where: { user_id },
            include: { listas: true }
        });
        const lists = user?.listas
        return lists
    }

    async createList(data: Prisma.ListasCreateInput): Promise<Listas> {
        const list = await prisma.listas.create({
            data
        })
        return list
    }

}