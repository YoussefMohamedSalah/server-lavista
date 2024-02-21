import { getRepository } from "typeorm";
import { Section } from "../entities/Section";

export const get_Section_By_Id = async (id: string) => {
  try {
    const sectionsRepository = getRepository(Section);
    const section = await sectionsRepository
      .createQueryBuilder("section")
      .where("section.id = :id", { id: id })
      .leftJoinAndSelect("section.village", "village")
      .getOne();
    return section;
  } catch (error) {
    console.error("Error Getting Section:", error);
    return;
  }
};

// ------------------------------------------------------------------------- //

export const get_Sections_By_Location_Id = async (locationId: string) => {
  try {
    const sectionsRepository = getRepository(Section);
    const sections = await sectionsRepository
      .createQueryBuilder("section")
      .where("section.location = :locationId", { locationId: locationId })
      .leftJoinAndSelect("section.location", "location")
      .leftJoinAndSelect("section.items", "item")
      .getMany();
    return sections;
  } catch (error) {
    console.error("Error Getting Items:", error);
    return;
  }
};

export const get_Sections_By_Village_Id = async (villageId: string) => {
  try {
    const sectionsRepository = getRepository(Section);
    const sections = await sectionsRepository
      .createQueryBuilder("section")
      .where("section.village = :villageId", { villageId: villageId })
      .leftJoinAndSelect("section.village", "village")
      .getMany();
    return sections;
  } catch (error) {
    console.error("Error Getting Items:", error);
    return;
  }
};
