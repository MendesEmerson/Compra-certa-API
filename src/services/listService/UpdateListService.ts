import { IListaRepository } from "../../repositories/listaRepository/listaRepositoryInterface";
import { UnauthorizedError } from "../Errors/UnauthorizedError";
import { ListNotFound } from "../Errors/ListNotFoundError";

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
        const list = await this.listaRepository.getListById(list_id)
       
        if (!list) {
            throw new ListNotFound();
        }

        if (list.usersId !== user_id) {
            throw new UnauthorizedError();
        }

        const updateList = await this.listaRepository.updateList({
            list_id,
            category,
            describle,
            name
        })
        return updateList
    }
}