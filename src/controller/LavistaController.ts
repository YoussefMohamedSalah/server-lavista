import { Request, Response } from "express";
import { get_Lavista, get_Lavista_Items, get_Lavista_Locations, get_Lavista_Sections, get_Lavista_Users, get_Lavista_Villages } from "../repositories/LavistaRepository";


export const getLavista = async (req: Request, res: Response) => {
  try {
    const lavista = await get_Lavista();
    if (!lavista) return res.status(404).json({ msg: "Lavista not found" });
    return res.status(200).json(lavista);
  } catch (error) {
    console.error("Error Retrieving Lavista:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// ------------------------------------------------------------------------- //

export const getLavistaUsers = async (req: Request, res: Response) => {
  try {
    const users = await get_Lavista_Users();
    if (!users) return res.status(404).json({ msg: "Lavista not found" });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error Retrieving Lavista:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getLavistaLocations = async (req: Request, res: Response) => {
  try {
    const locations = await get_Lavista_Locations();
    if (!locations) return res.status(404).json({ msg: "Lavista not found" });
    return res.status(200).json(locations);
  } catch (error) {
    console.error("Error Retrieving Lavista:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getLavistaVillages = async (req: Request, res: Response) => {
  try {
    const villages = await get_Lavista_Villages();
    if (!villages) return res.status(404).json({ msg: "Lavista not found" });
    return res.status(200).json(villages);
  } catch (error) {
    console.error("Error Retrieving Lavista:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getLavistaSections = async (req: Request, res: Response) => {
  try {
    const sections = await get_Lavista_Sections();
    if (!sections) return res.status(404).json({ msg: "Lavista not found" });
    return res.status(200).json(sections);
  } catch (error) {
    console.error("Error Retrieving Lavista Sections :", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getLavistaItems = async (req: Request, res: Response) => {
  try {
    const items = await get_Lavista_Items();
    if (!items) return res.status(404).json({ msg: "Lavista not found" });
    return res.status(200).json(items);
  } catch (error) {
    console.error("Error Retrieving Lavista :", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
