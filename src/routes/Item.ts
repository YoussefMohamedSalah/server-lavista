import { Router } from "express";
import { createItem, deleteItem, getItemById, updateItem } from "../controller/ItemsController";

const router = Router();

router.route("/").post(createItem);
router.route("/:id").get(getItemById).put(updateItem).delete(deleteItem);

export { router as LocationRouter };