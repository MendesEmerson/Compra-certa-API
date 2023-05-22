import { ItensRepository } from "../../repositories/itensRepository/ItensRepository";
import { ItemNotFound } from "../Errors/ItemNotFoundError";
import { ListaRepository } from "../../repositories/listaRepository/listaRepository";
import { UnauthorizedError } from "../Errors/UnauthorizedError"

interface IDeleteItemService {
    user_id: string;
    item_id: string;
}

export class DeleteItemService {
    constructor(
        private itensRepository: ItensRepository,
        private listasRepository: ListaRepository
    ) { }

    async execute({ item_id, user_id }: IDeleteItemService) {
        const item = await this.itensRepository.getItemById(item_id);

        if (!item?.listasId) {
            throw new ItemNotFound();
        }

        const lista = await this.listasRepository.getListById(item.listasId);

        if (!lista) {
            throw new ItemNotFound();
        }

        if (lista.usersId !== user_id) {
            throw new UnauthorizedError();
        }

        await this.itensRepository.deleteItem(item.itens_id);

        await this.listasRepository.updateList({
            list_id: lista.list_id,
            itens_quantity: lista.itens_quantity !== null ? lista.itens_quantity - 1 : 0
        })
    }
}
