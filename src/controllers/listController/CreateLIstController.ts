import { Request, Response } from "express"
import { ListaRepository } from "../../repositories/listaRepository/listaRepository";
import { CreateListService } from "../../services/listService/CreateListService";
import { z } from "zod";
import { UserRepository } from "../../repositories/userRepository/userRepository";

export const CreateList = async (request: Request, response: Response) => {
    const listaRepository = new ListaRepository()
    const userRepository = new UserRepository()
    const listaService = new CreateListService(listaRepository)

    const createBodySchema = z.object({
        name: z.string(),
        category: z.string(),
        describle: z.string(),
    })
    const { user_id } = request
    const { category, describle, name } = createBodySchema.parse(request.body)
    const user = await userRepository.findById(user_id)

    try {
        const newLIst = await listaService.execute({
            category,
            describle,
            name,
            user
        })
        return response.status(201).send(newLIst)
    } catch (error) {
        if(error instanceof Error) {
            response.status(500).json({message: error.message})
        }
    }
}