"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connect = mongoose_1.default.connect(String(process.env.MONGO_URI), {}, (err) => {
    if (err)
        console.log(err);
    else
        console.log("DB connection established...");
});
exports.default = connect;
