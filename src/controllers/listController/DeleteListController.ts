import { Request, Response } from "express";
import { ListaRepository } from "../../repositories/listaRepository/listaRepository";
import { DeleteListService } from "../../services/listService/DeleteListService";
import { UnauthorizedError } from "../../services/Errors/UnauthorizedError";

export const DeleteList = async (request: Request, response: Response) => {
    const listaRepository = new ListaRepository()
    const deleteListService = new DeleteListService(listaRepository)

    const { user_id } = request
    const { list_id } = request.params

    try {
        const deleteList = await deleteListService.execute({
            list_id,
            user_id
        }) 
        return response.status(204).json({message: "Lista deletada com sucesso!"})
    } catch (error) {
        if(error instanceof UnauthorizedError){
            return response.status(401).json({message: error.message})
        }
        return response.status(500).json({message: "Internal server error"})
    }
}