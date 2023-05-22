import { IListaRepository } from "../../repositories/listaRepository/listaRepositoryInterface";
import { Listas, Users } from "@prisma/client";
import { IUserRepository } from "../../repositories/userRepository/userRepositoryInterface";
import { UnauthorizedError } from "../Errors/UnauthorizedError";

interface ICreateListService {
    name: string;
    category?: string;
    describle: string;
    user_id: string
}

interface ICreateListServiceResponse {
    list: Listas;
}

export class CreateListService {
    constructor(
        private listaRepository: IListaRepository, private userRepository: IUserRepository
    ) { }

    async execute({ name, category, describle, user_id }: ICreateListService): Promise<ICreateListServiceResponse> {

        console.log(user_id)
        const user = await this.userRepository.findById(user_id)

        if (!user) {
            throw new UnauthorizedError()
        }

        const list = await this.listaRepository.createList({
            user: { connect: { user_id: user.user_id } },
            category,
            describle,
            name,
        });

        return { list };

    }
}
