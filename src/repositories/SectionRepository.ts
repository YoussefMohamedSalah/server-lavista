import { getRepository } from "typeorm";
import { Mechanics } from "../entities/sectionsTables/Mechanics";
import { Electronics } from "../entities/sectionsTables/Electronics";
import { LandScape } from "../entities/sectionsTables/LandScape";
import { TechnicalValidity } from "../entities/sectionsTables/TechnicalValidity";

// ok
export const get_Section_Mechanics = async (id: string) => {
    try {
        const mechanicsRepository = getRepository(Mechanics);
        const mechanics = await mechanicsRepository
            .createQueryBuilder("mechanics")
            .where("mechanics.id = :id", { id: id })
            .leftJoinAndSelect('mechanics.items', 'mechanics_item')
            .getOne();
        return mechanics;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Mechanics Items:", error);
        return;
    }
};

// ok
export const get_Section_Electronics = async (id: string) => {
    try {
        const electronicsRepository = getRepository(Electronics);
        const electronics = await electronicsRepository
            .createQueryBuilder("electronics")
            .where("electronics.id = :id", { id: id })
            .leftJoinAndSelect('electronics.items', 'electronics_item')
            .getOne();
        return electronics;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Electronics Items:", error);
        return;
    }
};

// ok
export const get_Section_LandScape = async (id: string) => {
    try {
        const landScapeRepository = getRepository(LandScape);
        const landScape = await landScapeRepository
            .createQueryBuilder("land_scape")
            .where("land_scape.id = :id", { id: id })
            .leftJoinAndSelect('land_scape.items', 'land_scape_item')
            .getOne();
        return landScape;
    } catch (error) {
        // Handle the error
        console.error("Error Getting LandScape Items:", error);
        return;
    }
};

// ok
export const get_Section_TechValidity = async (id: string) => {
    try {
        const techValidityRepository = getRepository(TechnicalValidity);
        const techValidity = await techValidityRepository
            .createQueryBuilder("technical_validity")
            .where("technical_validity.id = :id", { id: id })
            .leftJoinAndSelect('technical_validity.items', 'technical_validity_item')
            .getOne();
        return techValidity;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Technical Validity Items:", error);
        return;
    }
};