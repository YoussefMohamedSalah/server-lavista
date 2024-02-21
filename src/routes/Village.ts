import { Router } from "express";
import { createVillage, getVillageById, deleteVillage, updateVillage, getVillageDataById } from "../controller/VillageController";
import { getSectionsByVillageId } from "../controller/SectionController";

const router = Router();

router.route("/:id").post(createVillage); // location id
router.route("/sections/:id").get(getSectionsByVillageId);
router.route("/data/:id").get(getVillageDataById);
router.route("/:id").get(getVillageById).put(updateVillage).delete(deleteVillage);

export { router as VillageRouter };
