import { Request, Response } from 'express';
import { isValidUUID } from '../utils/validateUUID';
import { get_Section_By_Id, get_Section_With_Items_By_Id } from '../repositories/SectionRepository';

export const getSection = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const sections = await get_Section_By_Id(id);
        if (!sections) return res.status(404).json({ msg: "Sections not found" });
        return res.status(200).json(sections);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Sections:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
