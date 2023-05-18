import { ItensRepository } from "../../repositories/itensRepository/ItensRepository";
import { ItemNotFound } from "./itensErrors/ItemNotFoundError";
import { ListaRepository } from "../../repositories/listaRepository/listaRepository";
import { UnauthorizedError } from "../listService/listErrors/UnauthorizedError"

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
    }
}
