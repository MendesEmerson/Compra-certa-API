import { z } from "zod"
import { UserRepository } from "../../repositories/userRepository/userRepository"
import { AuthenticateUserService } from "../../services/userService/AuthenticateUserService"
import { Request, Response } from "express"
import { InvalidEmailOrPassword } from "../../services/Errors/InvalidEmailOrPasswordError"

export const AuthenticateUser = async (request: Request, response: Response) => {
    const userRepository = new UserRepository()
    const authenticateUserService = new AuthenticateUserService(userRepository)


    const createBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = createBodySchema.parse(request.body)

    try {
        const user = await authenticateUserService.execute({
            email,
            password
        })
        return response.status(200).send(user)
    } catch (error) {
        if (error instanceof InvalidEmailOrPassword) {
            return response.status(401).send({ message: error.message })
        }
        throw error
    }

}