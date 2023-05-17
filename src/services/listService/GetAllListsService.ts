import { IListaRepository } from "../../repositories/listaRepository/listaRepositoryInterface";

export class GetAllListsService {
    constructor(private listaRepository: IListaRepository,) { }

    async execute(user_id: string) {
        const lists = this.listaRepository.getAllLists(user_id)
        return lists
    }
}