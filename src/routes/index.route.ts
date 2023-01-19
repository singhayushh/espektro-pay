import { Router } from "express";
import { LoginHandler, LogoutHandler, OTPHandler, PaymentTypeHandler, RenderLandingPage, RenderLogin, RenderDashboard, TransactionHandler, SearchHandler } from "../controllers/index.controller";
import multer from 'multer';
import { storage } from '../config/cloudinary';
import { Auth } from "../middlewares/auth.middleware";
const upload = multer({ storage });

const indexRouter: Router = Router();

indexRouter.get("/", RenderLandingPage);
indexRouter.get("/login", RenderLogin);
indexRouter.get("/logout", Auth, LogoutHandler);
indexRouter.get("/dashboard", Auth, RenderDashboard);
indexRouter.post("/api/login", LoginHandler);
indexRouter.post("/search", Auth, SearchHandler);
indexRouter.post("/api/init", PaymentTypeHandler);
indexRouter.post("/api/cash", OTPHandler);
indexRouter.post("/api/transaction", upload.single('receipt'), TransactionHandler);

export default indexRouter;
