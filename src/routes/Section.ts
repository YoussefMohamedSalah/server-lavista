import { Router } from "express";
import { createSection, deleteSection, getSectionById, updateSection } from "../controller/SectionController";
import { getItemsBySectionId, getItemsBySectionIdAndTypeId } from "../controller/ItemsController";

const router = Router();

router.route("/:id").post(createSection);
router.route("/items/:villageId").post(getItemsBySectionIdAndTypeId);
router.route("/items/:id").get(getItemsBySectionId);
router.route("/:id").get(getSectionById).put(updateSection).delete(deleteSection);

export { router as SectionRouter };