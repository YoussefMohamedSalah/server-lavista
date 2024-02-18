import { Request, Response } from 'express';
import { isValidUUID } from '../utils/validateUUID';
import { getRepository } from 'typeorm';
import { Location } from '../entities/Location';
import { get_Village_By_Id, get_Village_Sections } from '../repositories/VillageRepository';
import { get_By_Id as get_Location_By_Id } from '../repositories/LocationRepository';
import { Village } from '../entities/Village';
// import { Electronics } from '../entities/sectionsTables/Electronics';
// import { LandScape } from '../entities/sectionsTables/LandScape';
// import { Mechanics } from '../entities/sectionsTables/Mechanics';
// import { TechnicalValidity } from '../entities/sectionsTables/TechnicalValidity';
import { get_Lavista } from '../repositories/LavistaRepository';


// export const addInitialSections = async (village: Village) => {
//     try {
//         const electronicsRepository = getRepository(Electronics);
//         const electronicsSection = new Electronics();
//         electronicsSection.village = village
//         await electronicsRepository.save(electronicsSection);
//         // -------------------------------------------------
//         const landScapeRepository = getRepository(LandScape);
//         const landScapeSection = new LandScape();
//         landScapeSection.village = village
//         await landScapeRepository.save(landScapeSection);
//         // -------------------------------------------------
//         const mechanicsRepository = getRepository(Mechanics);
//         const mechanicsSection = new Mechanics();
//         mechanicsSection.village = village
//         await mechanicsRepository.save(mechanicsSection);
//         // -------------------------------------------------
//         const techValidityRepository = getRepository(TechnicalValidity);
//         const techValiditySection = new TechnicalValidity();
//         techValiditySection.village = village
//         await techValidityRepository.save(techValiditySection);
//     } catch (error) {
//         console.log('error', error)
//         return;
//     }
// };

export const getVillageSections = async (req: Request, res: Response) => {
    const { id } = req.params!;
    try {
        const villageSections = await get_Village_Sections(id);
        if (!villageSections) return res.status(404).json({ msg: "Village is not found" });
        return res.status(200).json(villageSections);
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

        location.villages_count = location.villages_count + 1
        await location.save()
        return res.status(200).json(village);
    } catch (error) {
        // Handle the error
        console.error("Error Adding Village:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getVillageById = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const village = await get_Village_By_Id(id);
        if (!village) return res.status(404).json({ msg: "Village not found" });
        return res.status(200).json(village);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Village:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateVillage = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });

    try {
        const { name } = req.body;
        const village = await get_Village_By_Id(id);
        if (!village) return res.status(404).json({ msg: "Village not found" });
        village.name = name ? name : village.name;
        await village.save();
        return res.status(200).json(village);
    } catch (error) {
        // Handle the error
        console.error("Error Updating Village:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const deleteVillage = async (req: Request, res: Response) => {
    const { id } = req.params; let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const village = await get_Village_By_Id(id);
        if (!village) return res.status(404).json({ msg: "Village not found" });
        await village.remove();
        return res.status(200).json({ msg: "Village deleted" });
    } catch (error) {
        // Handle the error
        console.error("Error deleted Village:", error);
        return;
    }
};