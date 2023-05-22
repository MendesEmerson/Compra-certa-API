import { Request, Response } from "express";
import { ItensRepository } from "../../repositories/itensRepository/ItensRepository"
import { UpdateItemService } from "../../services/itensService/UpdateItemService";

export const UpdateItem = async (request: Request, response: Response) => {
    const itensRepository = new ItensRepository()
    const updateItemService = new UpdateItemService(itensRepository)

    const { item_id } = request.params
    const { name, sub_category, quantity, check } = request.body

    try {
        const item = await updateItemService.execute({
            itens_id: item_id,
            name,
            quantity,
            sub_category,
            check
        })
        return response.status(200).json(item)
    } catch (error) {

    }
}