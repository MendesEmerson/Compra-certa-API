import { Listas, Prisma } from "@prisma/client";

export interface IListaRepository {
    createList(data: Prisma.ListasCreateInput): Promise<Listas>
}