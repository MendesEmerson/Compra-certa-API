import { Request, Response } from "express"
import { ListaRepository } from "../../repositories/listaRepository/listaRepository";
import { CreateListService } from "../../services/listService/CreateListService";
import { UserRepository } from "../../repositories/userRepository/userRepository";

export const CreateList = async (request: Request, response: Response) => {
    const listaRepository = new ListaRepository()
    const userRepository = new UserRepository()
    const listaService = new CreateListService(listaRepository, userRepository)

    const { user_id } = request
    const { category, describle, name } = request.body

    try {
        const newLIst = await listaService.execute({
            category,
            describle,
            name,
            user_id
        })
        return response.status(201).send(newLIst)
    } catch (error) {
        if(error instanceof Error) {
            response.status(500).json({message: error.message})
        }
    }
}