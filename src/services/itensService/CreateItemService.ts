import { ItensRepository } from "../../repositories/itensRepository/ItensRepository"
import { ListNotFound } from "../Errors/ListNotFoundError"
import { ListaRepository } from "../../repositories/listaRepository/listaRepository"
import { UnauthorizedError } from "../Errors/UnauthorizedError"

interface ICreateItemService {
    name: string
    quantity: number
    sub_category: string
    list_id: string
    user_id: string
}

export class CreateItemService {
    constructor(private itensRepository: ItensRepository, private listRepository: ListaRepository) { }
    async execute({ list_id, name, quantity, sub_category, user_id }: ICreateItemService) {
        const list = await this.listRepository.getListById(list_id)

        if (!list) {
            throw new ListNotFound()
        }

        if(user_id !== list.usersId) {
            throw new UnauthorizedError()
        }

        const createItem = await this.itensRepository.createItem({
            name,
            quantity,
            sub_category,
            lista: list !== null ? { connect: { list_id: list.list_id } } : undefined
        })

        await this.listRepository.updateList({
            list_id: list.list_id,
            itens_quantity: list.itens_quantity !== null ? list.itens_quantity + 1 : 0
        })
        return createItem
    }
}