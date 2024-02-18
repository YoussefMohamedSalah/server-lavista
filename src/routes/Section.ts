import { Router } from "express";
import { getSection } from "../controller/SectionController";

const router = Router();

router.route("/items/:id").get(getSection)
export { router as SectionRouter };