import { Request, Response } from "express";
import { ItensRepository } from "../../repositories/itensRepository/ItensRepository";
import { ListaRepository } from "../../repositories/listaRepository/listaRepository";
import { GetAllItensService } from "../../services/itensService/GetAllItensService";
import { UnauthorizedError } from "../../services/Errors/UnauthorizedError";
import { ListNotFound } from "../../services/Errors/ListNotFoundError";

export const GetAllItens = async (request: Request, response: Response) => {
    const itensRepository = new ItensRepository()
    const listReposirory = new ListaRepository()
    const getAllItensService = new GetAllItensService(itensRepository, listReposirory)

    const { user_id } = request
    const { list_id } = request.params

    try {
        const getItens = await getAllItensService.execute({
            list_id,
            user_id
        })
        return response.status(200).json(getItens)
    } catch (error) {
        if(error instanceof UnauthorizedError) {
            return response.status(401).json({ message: error.message})
        }
        else if(error instanceof ListNotFound) {
            return response.status(404).json({ message: error.message})
        }
        return response.status(500).json({message: "Internal Server Error"})
    }

}