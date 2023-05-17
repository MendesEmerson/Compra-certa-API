import { Prisma, Listas } from "@prisma/client";
import { IListaRepository } from "./listaRepositoryInterface";
import { prisma } from "../../lib/prisma";

export class ListaRepository implements IListaRepository {
    async createList(data: Prisma.ListasCreateInput): Promise<Listas> {
        const list = await prisma.listas.create({
            data
        })
        return list
    }

}