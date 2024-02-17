import { Router } from "express";
import { addLocation, deleteLocation, getLocationById, getLocationVillages, updateLocation } from "../controller/LocationController";

const router = Router();

router.route("/").post(addLocation);
router.route("/:id").get(getLocationById).put(updateLocation).delete(deleteLocation);
router.route("/village/:id").get(getLocationVillages)

export { router as LocationRouter };