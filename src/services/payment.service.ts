import { PaymentTypeHandler } from "../controllers/index.controller";
import { paymentInitDto } from "../dtos/payment.dtos";
import { Payment } from "../models/payment.model";

export const initiatePaymentContext = async (dto: paymentInitDto) => {
    const newPayment = new Payment({ ...dto });
    return newPayment.save();
}

export const updateCashPayment = async (id: any, transactionId: string, transactionDate: Date) =>{
    return await Payment.findByIdAndUpdate(id, { transactionId, transactionDate });
}

export const updateTransactionPayment = async (id: any, transactionId: string, receiptUrl: string, transactionDate: Date ) =>{
    return await Payment.findByIdAndUpdate(id, { transactionId, receiptUrl, transactionDate });
}

export const fetchPaymentById = async (id: any) => {
    return await Payment.findById(id);
}