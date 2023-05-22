import { Itens, Prisma } from "@prisma/client";
import { IItensRepository } from "./ItensRepositoryInterface";
import { prisma } from "../../lib/prisma";
import { string } from "zod";

export class ItensRepository implements IItensRepository {
    async getItemById(itens_id: string): Promise<Itens | null> {
        const item = await prisma.itens.findUnique({
            where: {
                itens_id
            }
        })
        return item
    }

    async getAllItens(list_id: string): Promise<Itens[] | undefined> {
        const list = await prisma.listas.findUnique({
            where: { list_id },
            include: { itens: true }
        })
        const itens = list?.itens
        return itens
    }

    async createItem(data: Prisma.ItensCreateInput): Promise<Itens> {
        const item = await prisma.itens.create({
            data
        })
        return item
    }

    async updateItem(data: Prisma.ItensUpdateInput): Promise<Itens> {
        const { itens_id } = data
        const updateItem = await prisma.itens.update({
            where: {
                itens_id: itens_id as string
            },
            data
        })
        return updateItem
    }

    async deleteItem(item_id: string): Promise<void> {
        const deleteItem = await prisma.itens.delete({
            where: {
                itens_id: item_id
            }
        })
    }

}