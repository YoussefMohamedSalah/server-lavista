import { Request, Response } from "express";
import { get_Images_By_Section_Id } from "../repositories/ImagesRepository";
import { isValidUUID } from "../utils/validateUUID";
import { getRepository } from "typeorm";
import { Image } from "../entities/Image";
import { get_Section_By_Id } from "../repositories/SectionRepository";

export const getImagesBySectionId = async (req: Request, res: Response) => {
    const { id } = req.params!;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const images = await get_Images_By_Section_Id(id);
        if (!images) return res.status(404).json({ msg: "Images not found" });
        return res.status(200).json(images);
    } catch (error) {
        console.error("Error Retrieving Images:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const uploadImageBySectionId = async (req: Request, res: Response) => {
    const { id } = req.params!;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {

        const section = await get_Section_By_Id(id);
        if (!section) return res.status(404).json({ msg: "Section not found" });

        const uploadedImage = req.file!;

        const ImagesRepository = getRepository(Image);
        const image = new Image();
        image.url = uploadedImage ? uploadedImage.path : "";
        image.section = section;
        await ImagesRepository.save(image);
        return res.status(200).json({ msg: "file uploaded successfully" })
    } catch (error) {
        console.error("Error Retrieving Images:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};