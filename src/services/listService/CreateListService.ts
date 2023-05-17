import { number, string } from "zod";
import { IListaRepository } from "../../repositories/listaRepository/listaRepositoryInterface";
import { Listas } from "@prisma/client";

interface ICreateListService {
    name: string
    category: string
    describle: string
    itens_quantity: number

}

interface ICreateListServiceResponse {
    list: Listas
}

export class CreateListService {
    constructor(private listaRepository: IListaRepository) { }

    async execute({ name, category, describle, itens_quantity }: ICreateListService): Promise<ICreateListServiceResponse> {
        const list = await this.listaRepository.createList({
            category,
            describle,
            itens_quantity,
            name
        })
        return { list }
    }
}