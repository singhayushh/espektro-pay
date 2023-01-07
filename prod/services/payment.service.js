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
exports.searchPayments = exports.deletePaymentById = exports.fetchPayments = exports.fetchPaymentById = exports.updateTransactionPayment = exports.updateCashPayment = exports.initiatePaymentContext = void 0;
const payment_model_1 = require("../models/payment.model");
const initiatePaymentContext = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    const newPayment = new payment_model_1.Payment(Object.assign({}, dto));
    return newPayment.save();
});
exports.initiatePaymentContext = initiatePaymentContext;
const updateCashPayment = (id, transactionId, transactionDate) => __awaiter(void 0, void 0, void 0, function* () {
    return yield payment_model_1.Payment.findByIdAndUpdate(id, { transactionId, transactionDate });
});
exports.updateCashPayment = updateCashPayment;
const updateTransactionPayment = (id, transactionId, receiptUrl, transactionDate) => __awaiter(void 0, void 0, void 0, function* () {
    return yield payment_model_1.Payment.findByIdAndUpdate(id, { transactionId, receiptUrl, transactionDate });
});
exports.updateTransactionPayment = updateTransactionPayment;
const fetchPaymentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield payment_model_1.Payment.findById(id);
});
exports.fetchPaymentById = fetchPaymentById;
const fetchPayments = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield payment_model_1.Payment.find().sort({ createdAt: -1 }).skip(page).limit(10);
});
exports.fetchPayments = fetchPayments;
const deletePaymentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield payment_model_1.Payment.deleteOne({ _id: id });
});
exports.deletePaymentById = deletePaymentById;
const searchPayments = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield payment_model_1.Payment.find({ $text: { $search: query } });
});
exports.searchPayments = searchPayments;
