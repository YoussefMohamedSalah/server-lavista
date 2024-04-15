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

export const get_Image_By_Id = async (id: string) => {
    try {
        const imageRepository = getRepository(Image);
        const image = await imageRepository
            .createQueryBuilder("image")
            .where("image.id = :id", { id: id })
            .getOne();
        return image;
    } catch (error) {
        console.error("Error Getting Image:", error);
        return;
    }
};