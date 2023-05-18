import { Listas, Prisma } from "@prisma/client";

export interface IListaRepository {

    getAllLists(user_id: string): Promise <Listas[] | undefined>

    getListById(list_id: string): Promise<Listas | null>

    createList(data: Prisma.ListasCreateInput): Promise<Listas>

    updateList(data: Prisma.ListasUpdateInput): Promise<Listas>
    
    deleteList(list_id: string): void
}