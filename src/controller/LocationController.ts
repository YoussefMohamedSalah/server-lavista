import { Request, Response } from 'express';
import { isValidUUID } from '../utils/validateUUID';
import { getRepository } from 'typeorm';
import { Location } from '../entities/Location';
import { get_By_Id, get_Location_Villages } from '../repositories/LocationRepository';
import { get_Lavista } from '../repositories/LavistaRepository';


// ok
export const getLocationById = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const location = await get_By_Id(id);
        if (!location) return res.status(404).json({ msg: "Location not found" });
        return res.status(200).json(location);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Location:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// ok
export const getLocationVillages = async (req: Request, res: Response) => {
    const { id } = req.params!;
    try {
        const locationWithVillages = await get_Location_Villages(id);
        if (!locationWithVillages) return res.status(404).json({ msg: "Location Villages not found" });
        return res.status(200).json(locationWithVillages);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Location Villages:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// ok
export const addLocation = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const lavista = await get_Lavista();
        if (!lavista) return res.status(404).json({ msg: "Lavista not found" });

        const locationRepository = getRepository(Location);
        const location = new Location();
        location.name = name;
        location.lavista = lavista;
        await locationRepository.save(location);
        return res.status(200).json(location);
    } catch (error) {
        // Handle the error
        console.error("Error Adding Location:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// ok
export const updateLocation = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const location = await get_By_Id(id);
        if (!location) return res.status(404).json({ msg: "Location not found" });
        const { name } = req.body;
        location.name = name ? name : location.name;
        await location.save();
        return res.status(200).json(location);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Location:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// ok
export const deleteLocation = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const location = await get_By_Id(id);
        if (!location) return res.status(404).json({ msg: "Location not found" });
        await location.remove();
        return res.status(200).json({ msg: "Location deleted" });
    } catch (error) {
        // Handle the error
        console.error("Error deleted Location:", error);
        return;
    }
};