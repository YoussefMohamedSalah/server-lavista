import { getRepository } from "typeorm";
import { Location } from "../entities/Location";

export const get_Location_By_Id = async (id: string) => {
  try {
    const locationRepository = getRepository(Location);
    const location = await locationRepository
      .createQueryBuilder("location")
      .where("location.id = :id", { id: id })
      .getOne();
    return location;
  } catch (error) {
    console.error("Error Getting Location:", error);
    return;
  }
};