import { model, Schema, Model } from "mongoose";
import { paymentSchema } from "../dtos/payment.dtos";

const PaymentSchema: Schema<paymentSchema> = new Schema(
    {
        serial: {
            type: Number,
            default: 0,
        },
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

PaymentSchema.index({ name: "text", email: "text", phone: "text", year: "text", department: "text", transactionId: "text" });

const counterSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    seq: {
        type: Number,
        default: 0,
    },
});

const Counter = model('Counter', counterSchema);

PaymentSchema.pre('save', function(next) {
    if(!this.isNew) next();
    var doc = this;
    Counter.findByIdAndUpdate({_id: 'payments'}, {$inc: { seq: 1} }, {new: true, upsert: true}, function(error, counter)   {
        if(error)
            return next(error);
        doc.serial = counter ? counter.seq : 0;
        next();
    });
});

export const Payment: Model<paymentSchema> = model(
    "Payment",
    PaymentSchema
);
