import { IUserRepository } from "../../repositories/userRepository/userRepositoryInterface";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { InvalidEmailOrPassword } from "./userErrors/InvalidEmailOrPasswordError";


interface ICreateUserService {
    email: string
    password: string
}

export class AuthenticateUserService {
    constructor(private userRepository: IUserRepository) { }

    async execute({ email, password }: ICreateUserService) {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new InvalidEmailOrPassword()
        }

        const passwordMatch = await compare(password, user.password_hash)

        if (!passwordMatch) {
            throw new InvalidEmailOrPassword()
        }

        const token = sign({ email }, "bbca61cf2f25de7dfbe347b803122fda", {
            subject: user.user_id,
            expiresIn: "1d"
        })
        return token
    }
}