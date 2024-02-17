import { Request, Response } from 'express';
import { isValidUUID } from '../utils/validateUUID';
import { getRepository } from 'typeorm';
import { Location } from '../entities/Location';
import { get_By_Id, get_Village_Sections } from '../repositories/VillageRepository';
import { get_By_Id as get_Location_By_Id } from '../repositories/LocationRepository';
import { Village } from '../entities/Village';
import { Electronics } from '../entities/sectionsTables/Electronics';
import { LandScape } from '../entities/sectionsTables/LandScape';
import { Mechanics } from '../entities/sectionsTables/Mechanics';
import { TechnicalValidity } from '../entities/sectionsTables/TechnicalValidity';
import { get_Lavista } from '../repositories/LavistaRepository';


export const addInitialSections = async (village: Village) => {
    try {
        const electronicsRepository = getRepository(Electronics);
        const electronicsSection = new Electronics();
        electronicsSection.village = village
        await electronicsRepository.save(electronicsSection);
        // -------------------------------------------------
        const landScapeRepository = getRepository(LandScape);
        const landScapeSection = new LandScape();
        landScapeSection.village = village
        await landScapeRepository.save(landScapeSection);
        // -------------------------------------------------
        const mechanicsRepository = getRepository(Mechanics);
        const mechanicsSection = new Mechanics();
        mechanicsSection.village = village
        await mechanicsRepository.save(mechanicsSection);
        // -------------------------------------------------
        const techValidityRepository = getRepository(TechnicalValidity);
        const techValiditySection = new TechnicalValidity();
        techValiditySection.village = village
        await techValidityRepository.save(techValiditySection);
    } catch (error) {
        console.log('error', error)
        return;
    }
};

export const getVillageSections = async (req: Request, res: Response) => {
    const { id } = req.params!;
    try {
        const villageWithSections = await get_Village_Sections(id);
        if (!villageWithSections) return res.status(404).json({ msg: "Village is not found" });
        return res.status(200).json(villageWithSections);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Village with sections:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const createVillage = async (req: Request, res: Response) => {
    const { name, id } = req.body;
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

        await addInitialSections(village);

        location.villages_count = location.villages_count + 1
        await location.save()
        return res.status(200).json(village);
    } catch (error) {
        // Handle the error
        console.error("Error Adding Village:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// export const getAllVillages = async (req: Request, res: Response) => {
//     try {
//         const villages = await get_All_Villages();
//         if (!villages) return res.status(404).json({ msg: "Villages not found" });
//         return res.status(200).json(villages);
//     } catch (error) {
//         // Handle the error
//         console.error("Error Retrieving Villages:", error);
//         return res.status(500).json({ msg: "Internal server error" });
//     }
// };

export const addVillage = async (req: Request, res: Response) => {
    const { name } = req.body;
    const locationThumbnail = req.file!;
    try {
        const locationRepository = getRepository(Location);
        const location = new Location();
        location.name = name;
        // location.thumbnail = locationThumbnail ? locationThumbnail.path : '';
        await locationRepository.save(location);
        return res.status(200).json(location);
    } catch (error) {
        // Handle the error
        console.error("Error Adding Location:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getVillageById = async (req: Request, res: Response) => {
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

export const updateVillage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const locationThumbnail = req.file!;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });

    try {
        const location = await get_By_Id(id);
        if (!location) return res.status(404).json({ msg: "Location not found" });
        const { name } = req.body;
        location.name = name ? name : location.name;
        // location.thumbnail = locationThumbnail ? locationThumbnail.path : location.thumbnail;
        await location.save();
        return res.status(200).json(location);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Location:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const deleteVillage = async (req: Request, res: Response) => {
    const { id } = req.params; let isValid = isValidUUID(id);
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