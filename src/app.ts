import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { AuthRouter } from "./routes/Auth";
import { connectToDataBase } from "./config/dbConnection";
import { LocationRouter } from "./routes/Location";
import { VillageRouter } from "./routes/Village";
import { SectionRouter } from "./routes/Section";
import { LavistaRouter } from "./routes/Lavista";
import { addInitialData } from "./auto/AddInitialData";
import { ItemRouter } from "./routes/Item";
import { ImageRouter } from "./routes/Image";

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const corsOriginList = ["http://localhost:3001", "https://lavista.cp-portal.com", "https://www.lavista.cp-portal.com"]

app.use(
  cors({
    origin: corsOriginList,
  }),
);

connectToDataBase();
addInitialData();

app.get("/lav/api/download/file/:filename", (req, res) => {
  const { filename } = req.params!;
  // Set the desired filename and file path
  const filePath = path.join(__dirname, "../uploads/file/", filename);

  // Set the Content-Disposition header to force download
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

  // Send the file as the response
  res.sendFile(filePath);
});

app.use("/lav/api/auth", AuthRouter);
app.use("/lav/api/lavista", LavistaRouter);
app.use("/lav/api/location", LocationRouter);
app.use("/lav/api/village", VillageRouter);
app.use("/lav/api/section", SectionRouter);
app.use("/lav/api/item", ItemRouter);
app.use("/lav/api/image", ImageRouter);

// ************************************************
app.use(express.static("uploads"));
app.use("/lav/api/uploads", express.static("uploads"));

export default app;
