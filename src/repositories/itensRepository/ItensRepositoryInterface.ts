import { Itens, Prisma } from "@prisma/client";

export interface IItensRepository {
    getAllItens(list_id: string): Promise<Itens[] | undefined>

    getItemById(item_id: string): Promise<Itens | null>

    createItem(data: Prisma.ItensCreateInput): Promise<Itens>

    updateItem(data: Prisma.ItensUpdateInput): Promise<Itens>

    deleteItem(item_id: string): void

}