import mongoose, { Model, Schema } from "mongoose";

export interface IInvoice {
    user: mongoose.Schema.Types.ObjectId,
    totalPrice: number,
    goods: {
        name: string,
        description: string,
        categories: string[],
        images: { url: string }[],
        count: number,
        price: number
    }[],
    paymentMethod: "COD" | "paypal",
    ended?: boolean,
    deliveryLocation: string,
    createdAt: Date,
    endedAt: Date,
}

const InvoiceSchema = new Schema<IInvoice>({
    "user": { type: Schema.Types.ObjectId, required: true },
    "totalPrice": { type: Number, required: true },
    "goods": {
        type: [{
            "name": { type: String, required: true },
            "description": { type: String, default: "" },
            "categories": { type: [String], required: true },
            "images": {
                type: [{
                    "url": { type: String, required: true }
                }]
            },
            "count": { type: Number, required: true },
            "price": { type: Number, required: true }
        }], required: true
    },
    "paymentMethod": { type: String, enum: ["COD", "paypal"], default: "COD" },
    "ended": { type: Boolean, default: false },
    "deliveryLocation": { type: String, required: true },
    "createdAt": { type: Date, required: true, default: () => new Date() },
    "endedAt": { type: Date }
});

export const InvoicesModel = mongoose.model("invoice", InvoiceSchema) as Model<IInvoice>;