"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: String(process.env.SENDER_MAIL),
        pass: String(process.env.SENDER_PASSWORD),
    }
});
const sendMail = (mailBody, mailSubject, receiverMail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let mailOptions = {
            from: process.env.SENDER_MAIL,
            to: receiverMail,
            subject: mailSubject,
            html: mailBody
        };
        const info = yield transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return true;
    }
    catch (error) {
        console.log("Error sending email:", error);
        return false;
    }
});
exports.sendMail = sendMail;
