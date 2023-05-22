import { ItensRepository } from "../../repositories/itensRepository/ItensRepository";
import { ListaRepository } from "../../repositories/listaRepository/listaRepository";
import { ListNotFound } from "../Errors/ListNotFoundError";
import { UnauthorizedError } from "../Errors/UnauthorizedError";

interface IGetAllItensService {
    list_id: string
    user_id: string
}

export class GetAllItensService {
    constructor(private itensRepository: ItensRepository, private listRepository: ListaRepository){}

    async execute({list_id, user_id}: IGetAllItensService) {

        const list = await this.listRepository.getListById(list_id)
            
        if(!list) {
            throw new ListNotFound()
        }

        if(user_id !== list.usersId) {
            throw new UnauthorizedError()
        }

        const itens = await this.itensRepository.getAllItens(list_id)
        return itens
    }
}