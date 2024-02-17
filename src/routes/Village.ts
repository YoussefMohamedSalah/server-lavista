import { Router } from "express";
import { getVillageSections, createVillage } from "../controller/VillageController";

const router = Router();

router.route("/").post(createVillage);
router.route("/sections/:id").get(getVillageSections);

export { router as VillageRouter };