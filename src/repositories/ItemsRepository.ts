import { getRepository } from "typeorm";
import { Item } from "../entities/Item";


export const get_Item_By_Id = async (id: string) => {
  try {
    const itemRepository = getRepository(Item);
    const item = await itemRepository
      .createQueryBuilder("item")
      .where("item.id = :id", { id: id })
      .leftJoinAndSelect("item.section", "section")
      .leftJoinAndSelect("item.item_type", "item_type")
      .getOne();
    return item;
  } catch (error) {
    console.error("Error Getting Item:", error);
    return;
  }
};

// ------------------------------------------------------------------------- //

export const get_Items_By_Location_Id = async (locationId: string) => {
  try {
    const itemRepository = getRepository(Item);
    const item = await itemRepository
      .createQueryBuilder("item")
      .where("item.location = :locationId", { locationId: locationId })
      .leftJoinAndSelect("item.item_type", "item_type")
      .getMany();
    return item;
  } catch (error) {
    console.error("Error Getting Items:", error);
    return;
  }
};

export const get_Items_By_Village_Id = async (villageId: string) => {
  try {
    const itemRepository = getRepository(Item);
    const item = await itemRepository
      .createQueryBuilder("item")
      .where("item.village = :villageId", { villageId: villageId })
      .leftJoinAndSelect("item.item_type", "item_type")
      .getMany();
    return item;
  } catch (error) {
    console.error("Error Getting Items:", error);
    return;
  }
};

export const get_Items_By_Section_Id = async (sectionId: string) => {
  try {
    const itemRepository = getRepository(Item);
    const item = await itemRepository
      .createQueryBuilder("item")
      .where("item.section = :sectionId", { sectionId: sectionId })
      .leftJoinAndSelect("item.item_type", "item_type")
      .getMany();
    return item;
  } catch (error) {
    console.error("Error Getting Items:", error);
    return;
  }
};