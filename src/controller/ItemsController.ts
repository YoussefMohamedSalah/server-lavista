import { Request, Response } from "express";
import { get_Item_By_Id, get_Items_By_Location_Id, get_Items_By_Section_Id, get_Items_By_Village_Id } from "../repositories/ItemsRepository";
import { isValidUUID } from "../utils/validateUUID";
import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import { get_Section_By_Id } from "../repositories/SectionRepository";


export const createItem = async (req: Request, res: Response) => {
  const { id } = req.params!; // section id
  const { name, count, details, state, notes } = req.body;
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const section = await get_Section_By_Id(id);
    if (!section) return res.status(404).json({ msg: "Section not found" });

    const itemRepository = getRepository(Item);
    const item = new Item();
    item.name = name;
    item.count = count;
    item.details = details;
    item.state = state;
    item.notes = notes;

    item.lavista = section.lavista;
    item.location = section.location;
    item.village = section.village;
    item.section = section;

    await itemRepository.save(item);
    return res.status(200).json(item);
  } catch (error) {
    console.error("Error Adding Item:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params!; // item id
  const { name, count, details, state, notes } = req.body;
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const item = await get_Item_By_Id(id);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    item.name = name ? name : item.name;
    item.count = count ? count : item.count;
    item.details = details ? details : item.details;
    item.state = state ? state : item.state;
    item.notes = notes ? notes : item.notes;
    await item.save();
    return res.status(200).json(item);
  } catch (error) {
    console.error("Error Updating Item :", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  const { id } = req.params!; // item id
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const item = await get_Item_By_Id(id);
    if (!item) return res.status(404).json({ msg: "Item not found" });
    return res.status(200).json(item);
  } catch (error) {
    console.error("Error Retrieving Item :", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params; // item id
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const item = await get_Item_By_Id(id);
    if (!item) return res.status(404).json({ msg: "Item not found" });
    await item.remove();
    return res.status(200).json({ msg: "Item deleted" });
  } catch (error) {
    console.error("Error deleted Item:", error);
    return;
  }
};

// ------------------------------------------------------------------------- //

export const getItemsByLocationId = async (req: Request, res: Response) => {
  const { id } = req.params!; // location id
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const locationItems = await get_Items_By_Location_Id(id);
    if (!locationItems) return res.status(404).json({ msg: "Village is not found" });
    return res.status(200).json(locationItems);
  } catch (error) {
    console.error("Error Retrieving Village with sections:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getItemsByVillageId = async (req: Request, res: Response) => {
  const { id } = req.params!; // village id
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const items = await get_Items_By_Village_Id(id);
    if (!items) return res.status(404).json({ msg: "Items not found" });
    return res.status(200).json(items);
  } catch (error) {
    console.error("Error Retrieving Items :", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getItemsBySectionId = async (req: Request, res: Response) => {
  const { id } = req.params!;
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const items = await get_Items_By_Section_Id(id);
    if (!items) return res.status(404).json({ msg: "Items not found" });
    return res.status(200).json(items);
  } catch (error) {
    console.error("Error Retrieving Items:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
