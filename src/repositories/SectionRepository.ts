import { getRepository } from "typeorm";
import { Section } from "../entities/Section";
// ok

export const get_Section_By_Id = async (id: string) => {
    try {
        const sectionsRepository = getRepository(Section);
        const sections = await sectionsRepository
            .createQueryBuilder("section")
            .where("section.id = :id", { id: id })
            .getOne();
        return sections;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Section Items:", error);
        return;
    }
};

export const get_Section_With_Items_By_Id = async (id: string) => {
    try {
        const sectionsRepository = getRepository(Section);
        const sections = await sectionsRepository
            .createQueryBuilder("section")
            .where("section.id = :id", { id: id })
            .leftJoinAndSelect('section.items', 'item')
            .getOne();
        return sections;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Section Items:", error);
        return;
    }
};