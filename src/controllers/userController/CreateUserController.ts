import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserRepository } from "../../repositories/userRepository/userRepository";
import { CreateUserService } from "../../services/userService/CreateUserService";
import { UserAlreadyExistError } from "../../services/userService/userErrors/UserAlreadyExistError";


export const CreateUser = async (request: FastifyRequest, response: FastifyReply) => {
    const userRepository = new UserRepository()
    const createUserService = new CreateUserService(userRepository)

    const createBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, name, password } = createBodySchema.parse(request.body)

    try {
        await createUserService.execute({
            email, name, password
        })
        return response.status(201).send()
    } catch (error) {
        if (error instanceof UserAlreadyExistError) {
            return response.status(409).send({ message: error.message })
        }
        throw error
    }
}