import { Image } from "../entities/Image";
import { getRepository } from "typeorm";

export const get_Images_By_Section_Id = async (sectionId: string) => {
    try {
        const imagesRepository = getRepository(Image);
        const images = await imagesRepository
            .createQueryBuilder("image")
            .where("image.section = :sectionId", { sectionId: sectionId })
            .getMany();
        return images;
    } catch (error) {
        console.error("Error Getting Images:", error);
        return;
    }
};