import { Request, Response } from "express";
import { get_Lavista, get_Lavista_Item_Types, get_Lavista_Items, get_Lavista_Locations, get_Lavista_Sections, get_Lavista_Users, get_Lavista_Villages } from "../repositories/LavistaRepository";


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
    const lavista = await get_Lavista_Users();
    if (!lavista) return res.status(404).json({ msg: "Lavista not found" });
    return res.status(200).json(lavista.users);
  } catch (error) {
    console.error("Error Retrieving Lavista:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getLavistaLocations = async (req: Request, res: Response) => {
  try {
    const lavista = await get_Lavista_Locations();
    if (!lavista) return res.status(404).json({ msg: "Lavista not found" });
    return res.status(200).json(lavista.locations);
  } catch (error) {
    console.error("Error Retrieving Lavista:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getLavistaVillages = async (req: Request, res: Response) => {
  try {
    const lavista = await get_Lavista_Villages();
    if (!lavista) return res.status(404).json({ msg: "Lavista not found" });
    return res.status(200).json(lavista.villages);
  } catch (error) {
    console.error("Error Retrieving Lavista:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getLavistaSections = async (req: Request, res: Response) => {
  try {
    const lavista = await get_Lavista_Sections();
    if (!lavista) return res.status(404).json({ msg: "Lavista not found" });
    return res.status(200).json(lavista.sections);
  } catch (error) {
    console.error("Error Retrieving Lavista Sections :", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getLavistaItems = async (req: Request, res: Response) => {
  try {
    const lavista = await get_Lavista_Items();
    if (!lavista) return res.status(404).json({ msg: "Lavista not found" });
    return res.status(200).json(lavista.items);
  } catch (error) {
    console.error("Error Retrieving Lavista :", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// getLavistaItemTypes

export const getLavistaItemTypes = async (req: Request, res: Response) => {
  try {
    const lavista = await get_Lavista_Item_Types();
    if (!lavista) return res.status(404).json({ msg: "Lavista not found" });
    return res.status(200).json(lavista.item_types);
  } catch (error) {
    console.error("Error Retrieving Lavista :", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};