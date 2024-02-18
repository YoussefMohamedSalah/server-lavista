import { getRepository } from "typeorm";
import { Location } from "../entities/Location";

export const get_By_Id = async (id: string) => {
    try {
        const locationRepository = getRepository(Location);
        const location = await locationRepository
            .createQueryBuilder("location")
            .where("location.id = :id", { id: id })
            .leftJoinAndSelect('location.villages', 'village')
            .getOne();
        return location;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Location:", error);
        return;
    }
};

export const get_All_Locations = async () => {
    try {
        const locationRepository = getRepository(Location);
        const locations = await locationRepository
            .createQueryBuilder("location")
            .getMany();
        return locations;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Locations:", error);
        return;
    }
};