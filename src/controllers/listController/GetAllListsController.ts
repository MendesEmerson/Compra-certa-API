import { Request, Response } from "express"
import { ListaRepository } from "../../repositories/listaRepository/listaRepository"
import { GetAllListsService } from "../../services/listService/GetAllListsService"


export const GetAllLists = async (request: Request, response: Response) => {
    const listaRepository = new ListaRepository()
    const getAllListService = new GetAllListsService(listaRepository)

    const { user_id } = request

    try {
        const allLists = await getAllListService.execute(user_id)
        return response.status(200).send(allLists)

    } catch (error) {
        if(error instanceof Error) {
            response.status(500).json({message: error.message})
        }
    }
}