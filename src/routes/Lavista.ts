import { Router } from "express";
import { getLavista, getLavistaItems, getLavistaLocations, getLavistaSections, getLavistaUsers, getLavistaVillages } from "../controller/LavistaController";

const router = Router();

router.route("/").get(getLavista);
router.route("/users/").get(getLavistaUsers);
router.route("/locations/").get(getLavistaLocations);
router.route("/villages/").get(getLavistaVillages);
router.route("/sections/").get(getLavistaSections);
router.route("/items/").get(getLavistaItems);

export { router as LavistaRouter };
