import { Listas, Prisma } from "@prisma/client";

export interface IListaRepository {
    createList(data: Prisma.ListasCreateInput): Promise<Listas>
    updateList(data: Prisma.ListasUpdateInput): Promise<Listas>
    getAllLists(user_id: string): Promise <Listas[] | undefined>
}