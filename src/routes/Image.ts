import { Router } from "express";
import { getImagesBySectionId, uploadImageBySectionId } from "../controller/ImagesController";
import uploadFile from "../middleware/upload/uploadFile";

const router = Router();

router.route("/sec/:id").get(getImagesBySectionId);
router.route("/:id").post(uploadFile.single("file"), uploadImageBySectionId);

export { router as ImageRouter };