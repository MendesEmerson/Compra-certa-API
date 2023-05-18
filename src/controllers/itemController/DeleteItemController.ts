import { Request, Response } from "express";
import { ItensRepository } from "../../repositories/itensRepository/ItensRepository";
import { DeleteItemService } from "../../services/itensService/DeleteItemService";
import { ItemNotFound } from "../../services/Errors/ItemNotFoundError";
import { ListaRepository } from "../../repositories/listaRepository/listaRepository";
import { UnauthorizedError } from "../../services/Errors/UnauthorizedError";

export const DeleteItem = async (request: Request, response: Response) => {
    const itensRepository = new ItensRepository()
    const listaRepository = new ListaRepository()
    const deleteItemService = new DeleteItemService(itensRepository, listaRepository)

    const { item_id } = request.params
    const { user_id } = request

    try {
        const item = await deleteItemService.execute({item_id, user_id})
        return response.status(204).json()
    } catch (error) {
        if (error instanceof ItemNotFound) {
            return response.status(404).json({ message: error.message})
        } 
        else if (error instanceof UnauthorizedError) {
            return response.status(401).json({ message: error.message})

        }
        return response.status(500).json({ message: "Internal Server Error" })
    }
}