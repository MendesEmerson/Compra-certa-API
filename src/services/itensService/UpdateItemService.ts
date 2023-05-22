import { ItemNotFound } from "../Errors/ItemNotFoundError"
import { IItensRepository } from "../../repositories/itensRepository/ItensRepositoryInterface";

interface IUpdateItemService {
    itens_id: string
    name?: string;
    sub_category?: string;
    quantity?: number;
    check: boolean
}

export class UpdateItemService {
    constructor(
        private itemRepository: IItensRepository,
    ) { }
    async execute({ quantity, sub_category, name, itens_id, check }: IUpdateItemService) {

        const item = await this.itemRepository.getItemById(itens_id)

        if (!item) {
            throw new ItemNotFound()
        }

        const updateItem = await this.itemRepository.updateItem({
            itens_id: item.itens_id,
            name,
            quantity,
            sub_category,
            check,
        })

        return updateItem
    }
}