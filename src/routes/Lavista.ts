import { Router } from "express";
import { getAllElectronicsItems, getAllLandScapeItems, getAllLocations, getAllMechanicsItems, getAllTechnicalValidityItems, getAllUsers, getAllVillages } from "../controller/LavsiatController";


const router = Router();

router.route("/users/").get(getAllUsers);
router.route("/locations/").get(getAllLocations);
router.route("/villages/").get(getAllVillages);
router.route("/mechanics/").get(getAllMechanicsItems);
router.route("/electronics/").get(getAllElectronicsItems);
router.route("/technical_validity/").get(getAllTechnicalValidityItems);
router.route("/land_scape/").get(getAllLandScapeItems);

export { router as LavistaRouter };