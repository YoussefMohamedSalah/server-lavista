import { getRepository } from "typeorm";
import { Location } from "../entities/Location";

// ok
export const get_By_Id = async (id: string) => {
    try {
        const locationRepository = getRepository(Location);
        const location = await locationRepository
            .createQueryBuilder("location")
            .where("location.id = :id", { id: id })
            .getOne();
        return location;
    } catch (error) {
        // Handle the error
        console.error("Error Getting Location:", error);
        return;
    }
};

// ok
export const get_Location_Villages = async (id: string) => {
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

