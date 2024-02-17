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

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const corsOriginList = [
    "http://localhost:3001",
];
app.use(
    cors({
        origin: corsOriginList
    })
);

connectToDataBase();

// ROUTES //
app.get("/api/download/file/:filename", (req, res) => {
    const { filename } = req.params!;
    // Set the desired filename and file path
    const filePath = path.join(__dirname, "../uploads/file/", filename);

    // Set the Content-Disposition header to force download
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    // Send the file as the response
    res.sendFile(filePath);
});
// LavistaRouter
app.use("/api/auth", AuthRouter);
app.use("/api/lavista", LavistaRouter);

app.use('/api/location', LocationRouter);
app.use('/api/village', VillageRouter);
app.use('/api/section', SectionRouter);


// app.use('/api/stepper', StepperRouter);
// app.use('/api/dashboard', DashboardRouter);
// app.use('/api/attendance', AttendanceRouter);
// app.use('/api/request', RequestRouter);
// app.use('/api/company', CompanyRouter);
// app.use('/api/invoice', InvoiceRouter);
// app.use('/api/employee', EmployeeRouter)
// app.use('/api/department', DepartmentRouter);
// app.use('/api/task', TaskRouter);
// app.use('/api/tender', TenderRouter);
// app.use('/api/group', GroupRouter);
// app.use('/api/supplier', SupplierRouter);
// app.use('/api/customer', CustomerRouter);
// app.use('/api/subcontractor', SubcontractorRouter);
// app.use('/api/contract', ContractRouter);
// app.use('/api/inventory', InventoryRouter);
// app.use('/api/inventory_item', InventoryItemRouter);
// app.use('/api/project', ProjectRouter);
// app.use('/api/workflow', WorkFlowRouter);
// app.use('/api/notifications', NotificationRouter);
// ************************************************
app.use(express.static("uploads"));
app.use("/api/uploads", express.static("uploads"));

export default app;

// superuser@email.com
// $2b$10$i1LvU5NF/LrM3X.hgt29ReVPyGmawH5G.F3qlHIih0tC4T9NPZOBa