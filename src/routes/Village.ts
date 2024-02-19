import { Router } from "express";
import { createVillage, getVillageById, deleteVillage, updateVillage } from "../controller/VillageController";
import { getSectionsByVillageId } from "../controller/SectionController";
import { getItemsByVillageId } from "../controller/ItemsController";

const router = Router();

router.route("/:id").post(createVillage); // location id
router.route("/sections/:id").get(getSectionsByVillageId);
router.route("/items/:id").get(getItemsByVillageId);
router.route("/:id").get(getVillageById).put(updateVillage).delete(deleteVillage);

export { router as VillageRouter };
