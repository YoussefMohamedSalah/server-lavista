import { Request, Response } from "express";
import { isValidUUID } from "../utils/validateUUID";
import { getRepository } from "typeorm";
import {
  get_Village_By_Id,
  get_Village_Data_By_Id,
  get_Villages_By_Location_Id,
} from "../repositories/VillageRepository";
import { get_Location_By_Id } from "../repositories/LocationRepository";
import { Village } from "../entities/Village";
import { get_Lavista } from "../repositories/LavistaRepository";

export const createVillage = async (req: Request, res: Response) => {
  const { id } = req.params!; // location id
  const { name } = req.body;
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const lavista = await get_Lavista();
    if (!lavista) return res.status(404).json({ msg: "Lavista not found" });

    const location = await get_Location_By_Id(id);
    if (!location) return res.status(404).json({ msg: "Location not found" });

    const villageRepository = getRepository(Village);
    const village = new Village();
    village.name = name;
    village.lavista = lavista;
    village.location = location;
    await villageRepository.save(village);

    location.villages_count = location.villages_count + 1;
    location.villages = [...location.villages, village];
    await location.save();
    return res.status(200).json(village);
  } catch (error) {
    console.error("Error Adding Village:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateVillage = async (req: Request, res: Response) => {
  const { id } = req.params; // village id
  const { name } = req.body;
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const village = await get_Village_By_Id(id);
    if (!village) return res.status(404).json({ msg: "Village not found" });
    village.name = name ? name : village.name;
    await village.save();
    return res.status(200).json(village);
  } catch (error) {
    console.error("Error Updating Village:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getVillageById = async (req: Request, res: Response) => {
  const { id } = req.params; // village id
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const village = await get_Village_By_Id(id);
    if (!village) return res.status(404).json({ msg: "Village not found" });
    return res.status(200).json(village);
  } catch (error) {
    console.error("Error Retrieving Village:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteVillage = async (req: Request, res: Response) => {
  const { id } = req.params; // village id
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const village = await get_Village_By_Id(id);
    if (!village) return res.status(404).json({ msg: "Village not found" });
    await village.remove();
    return res.status(200).json({ msg: "Village deleted" });
  } catch (error) {
    console.error("Error deleted Village:", error);
    return;
  }
};

// ------------------------------------------------------------------------- //

export const getVillageDataById = async (req: Request, res: Response) => {
  const { id } = req.params!; // location id
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const village = await get_Village_Data_By_Id(id);
    if (!village) return res.status(404).json({ msg: "Village is not found" });
    return res.status(200).json(village);
  } catch (error) {
    console.error("Error Retrieving Village:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getVillagesByLocationId = async (req: Request, res: Response) => {
  const { id } = req.params!; // location id
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const locationVillages = await get_Villages_By_Location_Id(id);
    if (!locationVillages) return res.status(404).json({ msg: "Villages is not found" });
    return res.status(200).json(locationVillages);
  } catch (error) {
    console.error("Error Retrieving Villages:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
