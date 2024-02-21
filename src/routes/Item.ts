import { Router } from "express";
import { createItem, deleteItem, getItemById, updateItem } from "../controller/ItemsController";

const router = Router();

router.route("/:id").post(createItem).get(getItemById).put(updateItem).delete(deleteItem);

export { router as ItemRouter };
