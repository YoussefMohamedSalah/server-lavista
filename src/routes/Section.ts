import { Router } from "express";
import { getSectionElectronics, getSectionLandScape, getSectionMechanics, getSectionTechValidity } from "../controller/SectionController";

const router = Router();

router.route("/mechanics/:id").get(getSectionMechanics)
router.route("/electronics/:id").get(getSectionElectronics)
router.route("/landscape/:id").get(getSectionLandScape)
router.route("/tech_validity/:id").get(getSectionTechValidity)

export { router as SectionRouter };