import { Listas } from "@prisma/client"
import { ItensRepository } from "../../repositories/itensRepository/ItensRepository"
import { ListNotFound } from "./itensErrors/ListNotFound"
import { ListaRepository } from "../../repositories/listaRepository/listaRepository"

interface ICreateItemService {
    name: string
    quantity: number
    sub_category: string
    list_id: string
}

export class CreateItemService {
    constructor(private itensRepository: ItensRepository, private listRepository: ListaRepository) { }
    async execute({ list_id, name, quantity, sub_category }: ICreateItemService) {
        const list = await this.listRepository.getListById(list_id)
        const createItem = await this.itensRepository.createItem({
            name,
            quantity,
            sub_category,
            lista: list !== null ? { connect: { list_id: list.list_id } } : undefined
        })

        if (!list) {
            throw new ListNotFound()
        }
        
        await this.listRepository.updateList({
            list_id: list.list_id,
            itens_quantity: list.itens_quantity !== null ? list.itens_quantity + 1 : 0
        })
        return createItem
    }
}