import { ListaRepository } from "../../repositories/listaRepository/listaRepository";
import { UnauthorizedError } from "../Errors/UnauthorizedError";

interface IDeleteListService {
    user_id: string,
    list_id: string
}

export class DeleteListService {
    constructor(private listaRepository: ListaRepository) { }

    async execute({ list_id, user_id }: IDeleteListService) {
        const list = await this.listaRepository.getListById(list_id)
        if(list?.usersId !== user_id){
            throw new UnauthorizedError()
        }
        await this.listaRepository.deleteList(list_id)
    }
}