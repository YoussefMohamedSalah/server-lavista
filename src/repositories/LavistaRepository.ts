import { getRepository } from "typeorm";
import { Lavista } from "../entities/Lavista";


export const create_Lavista = async () => {
  try {
    const lavistaRepository = getRepository(Lavista);
    const lavista = await lavistaRepository
      .createQueryBuilder("lavista")
      .where("lavista.name = :name", { name: "Lavista" })
      .leftJoinAndSelect("lavista.locations", "location")
      .getOne();
    return lavista;
  } catch (error) {
    console.error("Error Getting Lavista:", error);
    return;
  }
};

export const get_Lavista = async () => {
  try {
    const lavistaRepository = getRepository(Lavista);
    const lavista = await lavistaRepository
      .createQueryBuilder("lavista")
      .where("lavista.name = :name", { name: "Lavista" })
      .getOne();
    return lavista;
  } catch (error) {
    console.error("Error Getting Lavista:", error);
    return;
  }
};

export const get_Lavista_Users = async () => {
  try {
    const lavistaRepository = getRepository(Lavista);
    const lavista = await lavistaRepository
      .createQueryBuilder("lavista")
      .where("lavista.name = :name", { name: "Lavista" })
      .leftJoinAndSelect("lavista.users", "user")
      .getOne();
    return lavista;
  } catch (error) {
    console.error("Error Getting Lavista:", error);
    return;
  }
};

export const get_Lavista_Locations = async () => {
  try {
    const lavistaRepository = getRepository(Lavista);
    const lavista = await lavistaRepository
      .createQueryBuilder("lavista")
      .where("lavista.name = :name", { name: "Lavista" })
      .leftJoinAndSelect("lavista.locations", "location")
      .getOne();
    return lavista;
  } catch (error) {
    console.error("Error Getting Locations:", error);
    return;
  }
};

export const get_Lavista_Villages = async () => {
  try {
    const lavistaRepository = getRepository(Lavista);
    const lavista = await lavistaRepository
      .createQueryBuilder("lavista")
      .where("lavista.name = :name", { name: "Lavista" })
      .leftJoinAndSelect("lavista.villages", "village")
      .getOne();
    return lavista;
  } catch (error) {
    console.error("Error Getting Lavista Villages:", error);
    return;
  }
};

export const get_Lavista_Sections = async () => {
  try {
    const lavistaRepository = getRepository(Lavista);
    const lavista = await lavistaRepository
      .createQueryBuilder("lavista")
      .where("lavista.name = :name", { name: "Lavista" })
      .leftJoinAndSelect("lavista.sections", "section")
      .getOne();
    return lavista;
  } catch (error) {

    console.error("Error Getting Lavista Sections:", error);
    return;
  }
};

export const get_Lavista_Items = async () => {
  try {
    const lavistaRepository = getRepository(Lavista);
    const lavista = await lavistaRepository
      .createQueryBuilder("lavista")
      .where("lavista.name = :name", { name: "Lavista" })
      .leftJoinAndSelect("lavista.items", "item")
      .getOne();
    return lavista;
  } catch (error) {
    console.error("Error Getting Lavista Items:", error);
    return;
  }
};

export const get_Lavista_Item_Types = async () => {
  try {
    const lavistaRepository = getRepository(Lavista);
    const lavista = await lavistaRepository
      .createQueryBuilder("lavista")
      .where("lavista.name = :name", { name: "Lavista" })
      .leftJoinAndSelect("lavista.item_types", "item_type")
      .getOne();
    return lavista;
  } catch (error) {
    console.error("Error Getting Lavista Item Types:", error);
    return;
  }
};