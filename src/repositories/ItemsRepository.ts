import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import { Lavista } from "../entities/Lavista";

export const get_Item_By_Id = async (id: string) => {
    try {
        const itemRepository = getRepository(Item);
        const item = await itemRepository
            .createQueryBuilder("item")
            .where("item.id = :id", { id: id })
            .getOne();
        return item;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Item:", error);
        return;
    }
};

export const get_All_Items = async () => {
    try {
        const lavistaRepository = getRepository(Lavista);
        const lavista = await lavistaRepository
            .createQueryBuilder("lavista")
            .where("lavista.name = :name", { name: 'Lavista' })
            .leftJoinAndSelect('lavista.items', 'item')
            .getOne();
        return lavista;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Item:", error);
        return;
    }
};
