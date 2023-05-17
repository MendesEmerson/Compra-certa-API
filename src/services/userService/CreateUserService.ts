import { Listas, Users } from "@prisma/client";
import { IUserRepository } from "../../repositories/userRepository/userRepositoryInterface";
import { hash } from "bcryptjs";
import { UserAlreadyExistError } from "./userErrors/UserAlreadyExistError";

interface ICreateUserService {
    name: string
    email: string
    password: string
}

interface ICreateUserServiceResponse {
    user: Users
}

export class CreateUserService {
    constructor(private userRepository: IUserRepository) { }

    async execute({ email, name, password }: ICreateUserService): Promise<ICreateUserServiceResponse> {
        const password_hash = await hash(password, 6)
        const userWithSameEmail = await this.userRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistError()
        }

        const user = await this.userRepository.createUser({
            email,
            name,
            password_hash,
        })
        
        return { user }
    }
}