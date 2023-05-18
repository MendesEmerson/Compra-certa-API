import { IListaRepository } from "../../repositories/listaRepository/listaRepositoryInterface";
import { UnauthorizedError } from "./listErrors/UnauthorizedError";

interface IUpdateListService {
    list_id: string
    name?: string;
    category?: string;
    describle?: string;
    user_id: string
}

export class UpdateListService {
    constructor(
        private listaRepository: IListaRepository,
    ) { }
    async execute({ category, describle, name, list_id, user_id }: IUpdateListService) {
        const updateList = await this.listaRepository.updateList({
            list_id,
            category,
            describle,
            name
        })
        if(updateList.usersId !== user_id) {
            throw new UnauthorizedError()
        }
        return updateList
    }
}