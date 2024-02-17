import { getRepository } from "typeorm";
import { Lavista } from "../entities/Lavista";


// ok
export const get_Lavista = async () => {
    try {
        const lavistaRepository = getRepository(Lavista);
        const lavista = await lavistaRepository
            .createQueryBuilder("lavista")
            .where("lavista.name = :name", { name: 'Lavista' })
            .getOne();
        return lavista;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Lavista:", error);
        return;
    }
};

export const get_All_Users = async () => {
    try {
        const lavistaRepository = getRepository(Lavista);
        const lavista = await lavistaRepository
            .createQueryBuilder("lavista")
            .where("lavista.name = :name", { name: 'Lavista' })
            .leftJoinAndSelect('lavista.users', 'user')
            .getOne();
        return lavista;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Lavista:", error);
        return;
    }
};

export const get_All_Locations = async () => {
    try {
        const lavistaRepository = getRepository(Lavista);
        const lavista = await lavistaRepository
            .createQueryBuilder("lavista")
            .where("lavista.name = :name", { name: 'Lavista' })
            .leftJoinAndSelect('lavista.locations', 'location')
            .getOne();
        return lavista;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Lavista:", error);
        return;
    }
};

export const get_All_Villages = async () => {
    try {
        const lavistaRepository = getRepository(Lavista);
        const lavista = await lavistaRepository
            .createQueryBuilder("lavista")
            .where("lavista.name = :name", { name: 'Lavista' })
            .leftJoinAndSelect('lavista.villages', 'village')
            .getOne();
        return lavista;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Lavista:", error);
        return;
    }
};

export const get_All_Mechanics_Items = async () => {
    try {
        const lavistaRepository = getRepository(Lavista);
        const lavista = await lavistaRepository
            .createQueryBuilder("lavista")
            .where("lavista.name = :name", { name: 'Lavista' })
            .leftJoinAndSelect('lavista.mechanics', 'mechanics_item')
            .getOne();
        return lavista;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Lavista:", error);
        return;
    }
};

export const get_All_Electronics_Items = async () => {
    try {
        const lavistaRepository = getRepository(Lavista);
        const lavista = await lavistaRepository
            .createQueryBuilder("lavista")
            .where("lavista.name = :name", { name: 'Lavista' })
            .leftJoinAndSelect('lavista.electronics', 'electronics_item')
            .getOne();
        return lavista;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Lavista:", error);
        return;
    }
};

export const get_All_TechnicalValidity_Items = async () => {
    try {
        const lavistaRepository = getRepository(Lavista);
        const lavista = await lavistaRepository
            .createQueryBuilder("lavista")
            .where("lavista.name = :name", { name: 'Lavista' })
            .leftJoinAndSelect('lavista.technicalValidity', 'technical_validity_item')
            .getOne();
        return lavista;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Lavista:", error);
        return;
    }
};

export const get_All_LandScape_Items = async () => {
    try {
        const lavistaRepository = getRepository(Lavista);
        const lavista = await lavistaRepository
            .createQueryBuilder("lavista")
            .where("lavista.name = :name", { name: 'Lavista' })
            .leftJoinAndSelect('lavista.landScape', 'land_scape_item')
            .getOne();
        return lavista;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Lavista:", error);
        return;
    }
};