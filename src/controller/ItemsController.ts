import { Request, Response } from 'express';
import { get_Item_By_Id, get_All_Items } from '../repositories/ItemsRepository';
import { isValidUUID } from '../utils/validateUUID';
import { get_Lavista } from '../repositories/LavistaRepository';
import { getRepository } from 'typeorm';
import { Item } from '../entities/Item';
import { get_Section_By_Id } from '../repositories/SectionRepository';
import { get_Village_By_Id } from '../repositories/VillageRepository';

export const createItem = async (req: Request, res: Response) => {
    const { name, count, details, state, notes, villageId, sectionId } = req.body;
    try {
        if (!villageId) return res.status(404).json({ msg: "village is missing" })
        if (!sectionId) return res.status(404).json({ msg: "section is missing" })

        const lavista = await get_Lavista();
        if (!lavista) return res.status(404).json({ msg: "Lavista not found" });

        const village = await get_Village_By_Id(sectionId)
        if (!village) return res.status(404).json({ msg: "Village not found" });

        const section = await get_Section_By_Id(sectionId)
        if (!section) return res.status(404).json({ msg: "Section not found" });

        const itemRepository = getRepository(Item);
        const item = new Item();
        item.name = name;
        item.count = count;
        item.details = details;
        item.state = state;
        item.notes = notes;

        item.lavista = lavista;
        item.village = village;
        item.section = section;

        await itemRepository.save(item);
        return res.status(200).json(item);
    } catch (error) {
        // Handle the error
        console.error("Error Adding Item:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateItem = async (req: Request, res: Response) => {
    const { id } = req.params!;
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
        // Handle the error
        console.error("Error Updating Item :", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getAllItems = async (req: Request, res: Response) => {
    try {
        const items = await get_All_Items();
        if (!items) return res.status(404).json({ msg: "Items not found" });
        return res.status(200).json(items);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Items :", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getItemById = async (req: Request, res: Response) => {
    const { id } = req.params!;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const item = await get_Item_By_Id(id);
        if (!item) return res.status(404).json({ msg: "Item not found" });
        return res.status(200).json(item);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Item :", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const deleteItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const item = await get_Item_By_Id(id);
        if (!item) return res.status(404).json({ msg: "Item not found" });
        await item.remove();
        return res.status(200).json({ msg: "Item deleted" });
    } catch (error) {
        // Handle the error
        console.error("Error deleted Item:", error);
        return;
    }
};