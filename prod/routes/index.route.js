"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../controllers/index.controller");
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("../config/cloudinary");
const upload = (0, multer_1.default)({ storage: cloudinary_1.storage });
const indexRouter = (0, express_1.Router)();
indexRouter.get("/", index_controller_1.RenderLandingPage);
indexRouter.get("/dashboard", index_controller_1.RenderDashboard);
indexRouter.post("/search", index_controller_1.SearchHandler);
indexRouter.post("/api/init", index_controller_1.PaymentTypeHandler);
indexRouter.post("/api/cash", index_controller_1.OTPHandler);
indexRouter.post("/api/transaction", upload.single('receipt'), index_controller_1.TransactionHandler);
exports.default = indexRouter;
