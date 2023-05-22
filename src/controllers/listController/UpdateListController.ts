import { Request, Response } from "express";
import { ListaRepository } from "../../repositories/listaRepository/listaRepository";
import { UpdateListService } from "../../services/listService/UpdateListService";
import { UnauthorizedError } from "../../services/Errors/UnauthorizedError";

export const UpdateList = async (request: Request, response: Response) => {
    const listaRepository = new ListaRepository();
    const updateListService = new UpdateListService(listaRepository);

    const { name, category, describle } = request.body;
    const { user_id } = request
    const { list_id } = request.params

    try {
        const updatedList = await updateListService.execute({ name, category, describle, list_id, user_id });
        return response.status(200).json(updatedList);
    } catch (error) {
        if(error instanceof UnauthorizedError){
            return response.status(401).json({message: error.message})
        }
        return response.status(500).json({message: "Internal Server Error"})
    }
};
