import { getRepository } from "typeorm";
import { Lavista } from "../entities/Lavista";
import { Village } from "../entities/Village";

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

export const get_All_Villages = async () => {
    try {
        const lavistaRepository = getRepository(Village);
        const lavista = await lavistaRepository
            .createQueryBuilder("lavista")
            .where("lavista.name = :name", { name: 'Lavista' })
            .leftJoinAndSelect('lavista.villages', 'village')
            .getOne();
        return lavista;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Lavista Villages:", error);
        return;
    }
};