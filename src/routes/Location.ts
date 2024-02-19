import { Router } from "express";
import { createLocation, deleteLocation, getLocationById, updateLocation } from "../controller/LocationController";
import { getVillagesByLocationId } from "../controller/VillageController";
import { getSectionsByLocationId } from "../controller/SectionController";
import { getItemsByLocationId } from "../controller/ItemsController";

const router = Router();

router.route("/").post(createLocation);
router.route("/villages/:id").get(getVillagesByLocationId);
router.route("/sections/:id").get(getSectionsByLocationId);
router.route("/items/:id").get(getItemsByLocationId);
router.route("/:id").get(getLocationById).put(updateLocation).delete(deleteLocation);

export { router as LocationRouter };
