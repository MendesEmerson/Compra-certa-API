import { IListaRepository } from "../../repositories/listaRepository/listaRepositoryInterface";
import { Listas, Users } from "@prisma/client";

interface ICreateListService {
    name: string;
    category: string;
    describle: string;
    user: Users | null
}

interface ICreateListServiceResponse {
    list: Listas;
}

export class CreateListService {
    constructor(
        private listaRepository: IListaRepository,
    ) { }

    async execute({ name, category, describle, user }: ICreateListService): Promise<ICreateListServiceResponse> {

        const list = await this.listaRepository.createList({
            category,
            describle,
            name,
            user: user !== null ? { connect: { user_id: user.user_id } } : undefined
        });

        return { list };
    }
}
