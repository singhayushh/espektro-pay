import { model, Schema, Model } from "mongoose";
import { paymentSchema } from "../dtos/payment.dtos";

const PaymentSchema: Schema<paymentSchema> = new Schema(
    {
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
    },
    {
        timestamps: true,
    }
);

export const Payment: Model<paymentSchema> = model(
    "Payment",
    PaymentSchema
);
