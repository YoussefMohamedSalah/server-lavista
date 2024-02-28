import { Request, Response } from "express";
import {
  get_Item_By_Id,
  get_Items_By_Location_Id,
  get_Items_By_Section_Id,
  get_Items_By_Section_Id_And_Type_Id,
  get_Items_By_Type_Id,
  get_Items_By_Village_Id,
} from "../repositories/ItemsRepository";
import { isValidUUID } from "../utils/validateUUID";
import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import { get_Section_By_Id } from "../repositories/SectionRepository";
import { get_Item_Type_By_Id } from "../repositories/ItemTypeRepository";

export const createItem = async (req: Request, res: Response) => {
  const { id } = req.params!; // section id
  const {
    itemTypeId,
    name,
    brand,
    count,
    hp,
    amp,
    phase,
    capacitor,
    front_bearing,
    back_bearing,
    q,
    h,
    mechanical_seal,
    o_ring,
    area,
    sand,
    sand_size,
    max_pressure,
    pump_type,
    details,
    state,
    filter_type,
    filter_diameter,
    filter_flow,
    notes,
  } = req.body;
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const section = await get_Section_By_Id(id);
    if (!section) return res.status(404).json({ msg: "Section not found" });

    const itemType = await get_Item_Type_By_Id(itemTypeId);
    if (!itemType) return res.status(404).json({ msg: "Item type not found" });

    const itemRepository = getRepository(Item);
    const item = new Item();
    if (name) item.name = name;
    if (brand) item.brand = brand;
    if (count) item.count = count;
    if (hp) item.hp = hp;
    if (amp) item.amp = amp;
    if (phase) item.phase = phase;
    if (capacitor) item.capacitor = capacitor;
    if (front_bearing) item.front_bearing = front_bearing;
    if (back_bearing) item.back_bearing = back_bearing;
    if (q) item.q = q;
    if (h) item.h = h;
    if (area) item.area = area;
    if (sand) item.sand = sand;
    if (sand_size) item.sand_size = sand_size;
    if (max_pressure) item.max_pressure = max_pressure;
    if (mechanical_seal) item.mechanical_seal = mechanical_seal;
    if (o_ring) item.o_ring = o_ring;
    if (pump_type) item.pump_type = pump_type;
    if (details) item.details = details;
    if (state) item.state = state;
    if (filter_type) item.filter_type = filter_type;
    if (filter_diameter) item.filter_diameter = filter_diameter;
    if (filter_flow) item.filter_flow = filter_flow;
    if (notes) item.notes = notes;

    item.lavista = section.lavista;
    item.location = section.location;
    item.village = section.village;
    item.section = section;
    item.item_type = itemType;

    await itemRepository.save(item);
    return res.status(200).json(item);
  } catch (error) {
    console.error("Error Adding Item:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params!; // item id
  const {
    name,
    brand,
    count,
    hp,
    amp,
    phase,
    capacitor,
    front_bearing,
    back_bearing,
    q,
    h,
    mechanical_seal,
    o_ring,
    area,
    sand,
    sand_size,
    max_pressure,
    pump_type,
    details,
    state,
    filter_type,
    filter_diameter,
    filter_flow,
    notes
  } = req.body;
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const item = await get_Item_By_Id(id);
    if (!item) return res.status(404).json({ msg: "Item not found" });
    if (name) item.name = name;
    if (brand) item.brand = brand;
    if (count) item.count = count;
    if (hp) item.hp = hp;
    if (amp) item.amp = amp;
    if (phase) item.phase = phase;
    if (capacitor) item.capacitor = capacitor;
    if (front_bearing) item.front_bearing = front_bearing;
    if (back_bearing) item.back_bearing = back_bearing;
    if (q) item.q = q;
    if (h) item.h = h;
    if (area) item.area = area;
    if (sand) item.sand = sand;
    if (sand_size) item.sand_size = sand_size;
    if (max_pressure) item.max_pressure = max_pressure;
    if (mechanical_seal) item.mechanical_seal = mechanical_seal;
    if (o_ring) item.o_ring = o_ring;
    if (pump_type) item.pump_type = pump_type;
    if (details) item.details = details;
    if (state) item.state = state;
    if (filter_type) item.filter_type = filter_type;
    if (filter_diameter) item.filter_diameter = filter_diameter;
    if (filter_flow) item.filter_flow = filter_flow;
    if (notes) item.notes = notes;
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

export const getItemsBySectionIdAndTypeId = async (req: Request, res: Response) => {
  const { secId, typeId } = req.params!;
  let isTypeValid = isValidUUID(typeId);
  if (!isTypeValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    if (secId === "0") {
      console.log(secId)
      const itemType = await get_Items_By_Type_Id(typeId);
      if (!itemType) return res.status(404).json({ msg: "Item type not found" });
      return res.status(200).json(itemType.items);
    } else {
      const items = await get_Items_By_Section_Id_And_Type_Id(secId, typeId);
      if (!items) return res.status(404).json({ msg: "Items not found" });
      return res.status(200).json(items);
    }
  } catch (error) {
    console.error("Error Retrieving Items:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
