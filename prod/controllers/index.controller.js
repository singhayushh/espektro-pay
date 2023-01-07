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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHandler = exports.TransactionHandler = exports.OTPHandler = exports.PaymentTypeHandler = exports.RenderDashboard = exports.RenderLandingPage = void 0;
const mail_service_1 = require("../services/mail.service");
const payment_service_1 = require("../services/payment.service");
const helper_1 = require("../utils/helper");
const RenderLandingPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.query;
    res.render('index', { message });
});
exports.RenderLandingPage = RenderLandingPage;
const RenderDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 0;
        const limit = Number(req.query.limit) || 10;
        const data = yield (0, payment_service_1.fetchPayments)(page, limit);
        res.render("dashboard", { page, data });
    }
    catch (error) {
        res.redirect("/?message=server error");
    }
});
exports.RenderDashboard = RenderDashboard;
const PaymentTypeHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dto = Object.assign({}, req.body);
        const otp = (0, helper_1.generateOtp)();
        if (dto.paymentType == "Cash") {
            dto.transactionId = String(otp);
            const obj = yield (0, payment_service_1.initiatePaymentContext)(dto);
            let mailBody = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                            <div style="margin:50px auto;width:70%;padding:20px 0">
                            <div style="border-bottom:1px solid #eee">
                                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Espektro 2023</a>
                            </div>
                            <p style="font-size:1.1em">Hi,</p>
                            <p>Hello admin. ${dto.name} - ${dto.email} has issued a cash based payment for Espektro. Use the following OTP to complete his registration procedures. OTP is valid for 5 minutes</p>
                            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                            <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
                            <hr style="border:none;border-top:1px solid #eee" />
                            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                                <p>Your Brand Inc</p>
                                <p>1600 Amphitheatre Parkway</p>
                                <p>California</p>
                            </div>
                            </div>
                            </div>`;
            let mailSubject = 'OTP for espektro | Cash payment';
            const sent = yield (0, mail_service_1.sendMail)(mailBody, mailSubject, dto.email);
            if (sent)
                res.render("cash", { id: obj._id });
            else
                res.redirect("/?message=Email error");
        }
        else if (dto.paymentType == "Online") {
            const data = yield (0, payment_service_1.initiatePaymentContext)(dto);
            res.render("online", { id: data._id });
        }
        else {
            res.redirect("/?message=Invalid payment type");
        }
    }
    catch (error) {
        console.log(error);
        res.redirect("/?message=server error");
    }
});
exports.PaymentTypeHandler = PaymentTypeHandler;
const OTPHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, transactionId, date } = req.body;
    try {
        const pay = yield (0, payment_service_1.fetchPaymentById)(id);
        if (!pay || pay.transactionId != transactionId) {
            yield (0, payment_service_1.deletePaymentById)(id);
            res.redirect("/?message=Invalid otp");
        }
        yield (0, payment_service_1.updateCashPayment)(id, transactionId, date);
        res.render("success", { id, mode: "cash" });
    }
    catch (error) {
        yield (0, payment_service_1.deletePaymentById)(id);
        res.redirect("/?message=server error");
    }
});
exports.OTPHandler = OTPHandler;
const TransactionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const path = String((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
    const { id, transactionId, date } = req.body;
    try {
        yield (0, payment_service_1.updateTransactionPayment)(id, transactionId, path, date);
        res.render("success", { id, mode: "online" });
    }
    catch (error) {
        yield (0, payment_service_1.deletePaymentById)(id);
        res.redirect("/?message=server error");
    }
});
exports.TransactionHandler = TransactionHandler;
const SearchHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.body.query;
    try {
        const data = yield (0, payment_service_1.searchPayments)(query);
        res.render("dashboard", { page: 1, data });
    }
    catch (error) {
        res.redirect("/?message=server error");
    }
});
exports.SearchHandler = SearchHandler;
