import { Router } from "express";
import { getAllItems, getAllLocations, getAllUsers, getAllVillages } from "../controller/LavistaController";


const router = Router();

router.route("/users/").get(getAllUsers);
router.route("/locations/").get(getAllLocations);
router.route("/villages/").get(getAllVillages);
router.route("/items/").get(getAllItems);

export { router as LavistaRouter };