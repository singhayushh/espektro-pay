import { Document } from "mongoose";

export interface paymentSchema extends Document {
    name: string,
    email: string,
    phone: string,
    department: string,
    year: string,
    paymentType: string,
    transactionId?: string,
    transactionDate?: Date,
    receiptUrl?: string,
}

export interface paymentInitDto {
    name: string,
    email: string,
    phone: string,
    department: string,
    year: string,
    paymentType: string,
    transactionId?: string,
}