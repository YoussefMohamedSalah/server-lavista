import { getRepository } from "typeorm";
import { Village } from "../entities/Village";

export const get_Village_By_Id = async (id: string) => {
  try {
    const villageRepository = getRepository(Village);
    const village = await villageRepository
      .createQueryBuilder("village")
      .where("village.id = :id", { id: id })
      .leftJoinAndSelect("village.location", "location")
      .leftJoinAndSelect("village.sections", "section")
      .getOne();
    return village;
  } catch (error) {
    // Handle the error
    console.error("Error Getting Village:", error);
    return;
  }
};

export const get_Village_Data_By_Id = async (id: string) => {
  try {
    const villageRepository = getRepository(Village);
    const village = await villageRepository
      .createQueryBuilder("village")
      .where("village.id = :id", { id: id })
      .leftJoinAndSelect("village.sections", "section")
      .leftJoinAndSelect("village.items", "item")
      .getOne();
    return village;
  } catch (error) {
    // Handle the error
    console.error("Error Getting Village:", error);
    return;
  }
};

// ------------------------------------------------------------------------- //

export const get_Villages_By_Location_Id = async (locationId: string) => {
  try {
    const villagesRepository = getRepository(Village);
    const villages = await villagesRepository
      .createQueryBuilder("village")
      .where("village.location = :locationId", { locationId: locationId })
      .leftJoinAndSelect("village.location", "location")
      .getMany();
    return villages;
  } catch (error) {
    console.error("Error Getting Villages:", error);
    return;
  }
};
