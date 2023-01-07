import { Router } from "express";
import { OTPHandler, PaymentTypeHandler, RenderLandingPage, RenderDashboard, TransactionHandler, SearchHandler } from "../controllers/index.controller";
import multer from 'multer';
import { storage } from '../config/cloudinary';
const upload = multer({ storage });

const indexRouter: Router = Router();

indexRouter.get("/", RenderLandingPage);
indexRouter.get("/dashboard", RenderDashboard);
indexRouter.post("/search", SearchHandler);
indexRouter.post("/api/init", PaymentTypeHandler);
indexRouter.post("/api/cash", OTPHandler);
indexRouter.post("/api/transaction", upload.single('receipt'), TransactionHandler);

export default indexRouter;
