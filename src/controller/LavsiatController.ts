import { Request, Response } from 'express';
import { isValidUUID } from '../utils/validateUUID';
import { get_All_Users, get_All_Locations, get_All_Villages, get_All_Mechanics_Items, get_All_Electronics_Items, get_All_TechnicalValidity_Items, get_All_LandScape_Items } from '../repositories/LavistaRepository';



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
        console.error("Error Retrieving Lavista Locations:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getAllVillages = async (req: Request, res: Response) => {
    try {
        const villages = await get_All_Villages();
        if (!villages) return res.status(404).json({ msg: "Lavista Villages not found" });
        return res.status(200).json(villages);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Lavista Villages:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getAllMechanicsItems = async (req: Request, res: Response) => {
    try {
        const mechanicsItems = await get_All_Mechanics_Items();
        if (!mechanicsItems) return res.status(404).json({ msg: "Lavista Mechanics Items not found" });
        return res.status(200).json(mechanicsItems);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Lavista Mechanics Items:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getAllElectronicsItems = async (req: Request, res: Response) => {
    try {
        const electronicsItems = await get_All_Electronics_Items();
        if (!electronicsItems) return res.status(404).json({ msg: "Lavista Electronics not found" });
        return res.status(200).json(electronicsItems);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Lavista Electronics Items:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getAllTechnicalValidityItems = async (req: Request, res: Response) => {
    try {
        const techValidityItems = await get_All_TechnicalValidity_Items();
        if (!techValidityItems) return res.status(404).json({ msg: "Lavista  not found" });
        return res.status(200).json(techValidityItems);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Lavista Mechanics Items:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getAllLandScapeItems = async (req: Request, res: Response) => {
    try {
        const landScapeItems = await get_All_LandScape_Items();
        if (!landScapeItems) return res.status(404).json({ msg: "Lavista LandScape Items not found" });
        return res.status(200).json(landScapeItems);
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Lavista LandScape Items:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};




























// export const getLocationVillages = async (req: Request, res: Response) => {
//     const { id } = req.params!;
//     try {
//         const locationWithVillages = await get_Location_Villages();
//         if (!locationWithVillages) return res.status(404).json({ msg: "Lavista  not found" });
//         return res.status(200).json(locationWithVillages);
//     } catch (error) {
//         // Handle the error
//         console.error("Error Retrieving Lavista :", error);
//         return res.status(500).json({ msg: "Internal server error" });
//     }
// };

// export const getAllLocations = async (req: Request, res: Response) => {
//     try {
//         const locations = await get_All_Locations();
//         if (!locations) return res.status(404).json({ msg: "Locations not found" });
//         return res.status(200).json(locations);
//     } catch (error) {
//         // Handle the error
//         console.error("Error Retrieving Locations:", error);
//         return res.status(500).json({ msg: "Internal server error" });
//     }
// };

// export const addLocation = async (req: Request, res: Response) => {
//     const { name } = req.body;
//     const locationThumbnail = req.file!;
//     try {
//         const locationRepository = getRepository(Location);
//         const location = new Location();
//         location.name = name;
//         // location.thumbnail = locationThumbnail ? locationThumbnail.path : '';
//         await locationRepository.save(location);
//         return res.status(200).json(location);
//     } catch (error) {
//         // Handle the error
//         console.error("Error Adding Location:", error);
//         return res.status(500).json({ msg: "Internal server error" });
//     }
// };

// export const getLocationById = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     let isValid = isValidUUID(id);
//     if (!isValid) return res.status(400).json({ msg: "id is not valid" });
//     try {
//         const location = await get_By_Id(id);
//         if (!location) return res.status(404).json({ msg: "Location not found" });
//         return res.status(200).json(location);
//     } catch (error) {
//         // Handle the error
//         console.error("Error Retrieving Location:", error);
//         return res.status(500).json({ msg: "Internal server error" });
//     }
// };

// export const updateLocation = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const locationThumbnail = req.file!;
//     let isValid = isValidUUID(id);
//     if (!isValid) return res.status(400).json({ msg: "id is not valid" });

//     try {
//         const location = await get_By_Id(id);
//         if (!location) return res.status(404).json({ msg: "Location not found" });
//         const { name } = req.body;
//         location.name = name ? name : location.name;
//         // location.thumbnail = locationThumbnail ? locationThumbnail.path : location.thumbnail;
//         await location.save();
//         return res.status(200).json(location);
//     } catch (error) {
//         // Handle the error
//         console.error("Error Retrieving Location:", error);
//         return res.status(500).json({ msg: "Internal server error" });
//     }
// };

// export const deleteLocation = async (req: Request, res: Response) => {
//     const { id } = req.params; let isValid = isValidUUID(id);
//     if (!isValid) return res.status(400).json({ msg: "id is not valid" });
//     try {
//         const location = await get_By_Id(id);
//         if (!location) return res.status(404).json({ msg: "Location not found" });
//         await location.remove();
//         return res.status(200).json({ msg: "Location deleted" });
//     } catch (error) {
//         // Handle the error
//         console.error("Error deleted Location:", error);
//         return;
//     }
// };