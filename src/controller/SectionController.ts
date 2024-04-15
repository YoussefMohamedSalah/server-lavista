import { Request, Response } from "express";
import { isValidUUID } from "../utils/validateUUID";
import {
  get_Section_By_Id,
  get_Sections_By_Location_Id,
  get_Sections_By_Village_Id,
} from "../repositories/SectionRepository";
import { get_Lavista } from "../repositories/LavistaRepository";
import { Section } from "../entities/Section";
import { get_Village_By_Id } from "../repositories/VillageRepository";
import { getRepository } from "typeorm";

export const createSection = async (req: Request, res: Response) => {
  const { id } = req.params!; // village id
  const { name } = req.body;
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const lavista = await get_Lavista();
    if (!lavista) return res.status(404).json({ msg: "Lavista not found" });

    const village = await get_Village_By_Id(id);
    if (!village) return res.status(404).json({ msg: "Village not found" });

    const sectionRepository = getRepository(Section);
    const section = new Section();
    section.name = name;
    section.lavista = lavista;
    section.village = village;
    section.location = village.location;
    await sectionRepository.save(section);

    village.sections_count = village.sections_count + 1;
    village.sections = [...village.sections, section];
    await village.save();
    return res.status(200).json(village);
  } catch (error) {
    console.error("Error Adding Village:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateSection = async (req: Request, res: Response) => {
  const { id } = req.params!; // section id
  const { name } = req.body;
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const section = await get_Section_By_Id(id);
    if (!section) return res.status(404).json({ msg: "Section not found" });
    section.name = name ? name : section.name;
    await section.save();
    return res.status(200).json(section);
  } catch (error) {
    console.error("Error Updating Section:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getSectionById = async (req: Request, res: Response) => {
  const { id } = req.params; // section id
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const sections = await get_Section_By_Id(id);
    if (!sections) return res.status(404).json({ msg: "Sections not found" });
    return res.status(200).json(sections);
  } catch (error) {
    console.error("Error Retrieving Section:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteSection = async (req: Request, res: Response) => {
  const { id } = req.params; // section id
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const section = await get_Section_By_Id(id);
    if (!section) return res.status(404).json({ msg: "Section not found" });
    await section.remove();

    const village = await get_Village_By_Id(section.village.id);
    if (!village) return res.status(404).json({ msg: "Village not found" });

    village.sections_count = village.sections_count - 1;
    await village.save();
    return res.status(200).json({ msg: "Section deleted" });
  } catch (error) {
    console.error("Error deleted Section:", error);
    return;
  }
};

// ------------------------------------------------------------------------- //

export const getSectionsByLocationId = async (req: Request, res: Response) => {
  const { id } = req.params!; // location id
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const locationSections = await get_Sections_By_Location_Id(id);
    if (!locationSections) return res.status(404).json({ msg: "Sections is not found" });
    return res.status(200).json(locationSections);
  } catch (error) {
    console.error("Error Retrieving sections:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getSectionsByVillageId = async (req: Request, res: Response) => {
  const { id } = req.params!; // village id
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  try {
    const villageSections = await get_Sections_By_Village_Id(id);
    if (!villageSections) return res.status(404).json({ msg: "Sections is not found" });
    return res.status(200).json(villageSections);
  } catch (error) {
    console.error("Error Retrieving sections:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
