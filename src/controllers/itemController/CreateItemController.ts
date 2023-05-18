import { Request, Response } from "express";
import { ItensRepository } from "../../repositories/itensRepository/ItensRepository";
import { CreateItemService } from "../../services/itensService/CreateItemService";
import { z } from "zod";
import { ListaRepository } from "../../repositories/listaRepository/listaRepository";
import { ListNotFound } from "../../services/itensService/itensErrors/ListNotFound";

export const CreateItem = async (request: Request, response: Response) => {
    const itensRepository = new ItensRepository()
    const listRepository = new ListaRepository()
    const createItemService = new CreateItemService(itensRepository, listRepository)

    const createBodySchema = z.object({
        name: z.string(),
        quantity: z.number(),
        sub_category: z.string(),
    })

    const { list_id } = request.params
    const { sub_category, quantity, name } = createBodySchema.parse(request.body)

    try {
        const newItem = await createItemService.execute({
            list_id,
            name,
            quantity,
            sub_category
        })
        return response.status(201).json(newItem)
    } catch (error) {
        if(error instanceof ListNotFound) {
            return response.status(404).json({message: error.message})
        }
        return response.status(500).json({message: "Internal Server Error"})
    }

}