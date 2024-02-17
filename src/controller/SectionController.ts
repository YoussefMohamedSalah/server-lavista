import { Request, Response } from 'express';
import { isValidUUID } from '../utils/validateUUID';
import { get_Section_Electronics, get_Section_LandScape, get_Section_Mechanics, get_Section_TechValidity } from '../repositories/SectionRepository';


export const getSectionMechanics = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const locations = await get_Section_Mechanics(id);
        if (!locations) return res.status(404).json({ msg: "Sections not found" });
        return res.status(200).json(locations);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Sections:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getSectionElectronics = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const locations = await get_Section_Electronics(id);
        if (!locations) return res.status(404).json({ msg: "Sections not found" });
        return res.status(200).json(locations);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Sections:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getSectionLandScape = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const locations = await get_Section_LandScape(id);
        if (!locations) return res.status(404).json({ msg: "Sections not found" });
        return res.status(200).json(locations);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Sections:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getSectionTechValidity = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const locations = await get_Section_TechValidity(id);
        if (!locations) return res.status(404).json({ msg: "Sections not found" });
        return res.status(200).json(locations);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Sections:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};