import { getRepository } from "typeorm";
import { ItemType } from "../entities/ItemType";

export const get_Item_Type_By_Id = async (id: string) => {
    try {
        const itemTypeRepository = getRepository(ItemType);
        const item = await itemTypeRepository
            .createQueryBuilder("item_type")
            .where("item_type.id = :id", { id: id })
            .getOne();
        return item;
    } catch (error) {
        console.error("Error Getting Item Type:", error);
        return;
    }
};
