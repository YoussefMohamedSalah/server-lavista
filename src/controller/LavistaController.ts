import { Request, Response } from 'express';
import { get_All_Users, get_All_Villages } from '../repositories/LavistaRepository';
import { get_All_Locations } from '../repositories/LocationRepository';
import { get_All_Items } from '../repositories/ItemsRepository';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await get_All_Users();
        if (!users) return res.status(404).json({ msg: "Lavista Users not found" });
        return res.status(200).json(users);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Lavista :", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getAllLocations = async (req: Request, res: Response) => {
    try {
        const locations = await get_All_Locations();
        if (!locations) return res.status(404).json({ msg: "Lavista Locations not found" });
        return res.status(200).json(locations);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Lavista :", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getAllVillages = async (req: Request, res: Response) => {
    try {
        const users = await get_All_Villages();
        if (!users) return res.status(404).json({ msg: "Lavista Users not found" });
        return res.status(200).json(users);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Lavista :", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getAllItems = async (req: Request, res: Response) => {
    try {
        const users = await get_All_Items();
        if (!users) return res.status(404).json({ msg: "Lavista Users not found" });
        return res.status(200).json(users);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Lavista :", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};