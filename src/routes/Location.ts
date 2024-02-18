import { Router } from "express";
import { createLocation, deleteLocation, getLocationById, updateLocation } from "../controller/LocationController";

const router = Router();

router.route("/").post(createLocation);
router.route("/:id").get(getLocationById).put(updateLocation).delete(deleteLocation);

export { router as LocationRouter };