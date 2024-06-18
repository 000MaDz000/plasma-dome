import { model, Schema } from "mongoose";

export interface IOrder {
    customerName: string;
    customerPhone: string;
    deleveryAddress: string;
    orderDate: Date;
}

const OrderSchema = new Schema<IOrder>({
    customerName: {
        type: String,
        required: true,
    },
    customerPhone: {
        type: String,
        required: true,
    },
    deleveryAddress: String,
    orderDate: {
        type: Date,
        default: Date.now
    }
})

const Order = model("Order", OrderSchema);

global.models.Order = Order;

export default Order;