import { getRepository } from "typeorm";
import { Village } from "../entities/Village";

export const get_By_Id = async (id: string) => {
    try {
        const villageRepository = getRepository(Village);
        const village = await villageRepository
            .createQueryBuilder("village")
            .where("village.id = :id", { id: id })
            .getOne();
        return village;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Village:", error);
        return;
    }
};

export const get_Village_Sections = async (id: string) => {
    try {
        const villageRepository = getRepository(Village);
        const village = await villageRepository
            .createQueryBuilder("village")
            .where("village.id = :id", { id: id })
            .leftJoinAndSelect('village.mechanics_section', 'mechanics')
            .leftJoinAndSelect('village.electronics_section', 'electronics')
            .leftJoinAndSelect('village.landScape_section', 'land_scape')
            .leftJoinAndSelect('village.technicalValidity_section', 'technical_validity')

            .getOne();
        return village;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Village:", error);
        return;
    }
};


// export const get_All_Villages = async () => {
//     try {
//         const villageRepository = getRepository(Village);
//         const village = await villageRepository
//             .createQueryBuilder("village")
//             .orderBy("village.createdAt", "DESC")
//             .getMany();
//         return village;
//     } catch (error) {
//         // Handle the error
//         console.error("Error Getting All Villages:", error);
//         return;
//     }
// }