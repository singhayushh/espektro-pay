"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true,
        enum: ["CSE", "ECE", "EE", "ME", "IT"],
    },
    year: {
        type: String,
        required: true,
        enum: ["1st", "2nd", "3rd", "4th"],
    },
    paymentType: {
        type: String,
        required: true,
        enum: ["Cash", "Online"],
    },
    transactionId: {
        type: String,
        default: null
    },
    transactionDate: {
        type: Date,
        default: null
    },
    receiptUrl: {
        type: String,
        default: "",
    }
}, {
    timestamps: true,
});
PaymentSchema.index({ name: "text", email: "text", phone: "text", year: "text", department: "text", transactionId: "text" });
exports.Payment = (0, mongoose_1.model)("Payment", PaymentSchema);
