import { ICartProduct } from "@/app/_actions/get-cart-data";
import { Model, model, Schema } from "mongoose";

export type IOrderStatus = "pending" | "cancelled" | "shipped" | "completed"
export interface IOrder {
    _id?: any;
    customerName: string;
    customerPhone: string;
    deleveryAddress: string;
    orderDate: Date;
    products: ICartProduct[];
    status: IOrderStatus,
    totalPrice: number;
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
    totalPrice: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "pending"
    },
    deleveryAddress: String,
    products: {
        type: [{
            quantity: {
                type: Number,
                required: true,
            },
            images: {
                type: [String],
                required: true,
            },
            _id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            categories: [String],
            description: String,
            price: {
                type: Number,
                required: true,
            },
        }],
        required: true
    },
})

OrderSchema.index({ "ended": -1 });
OrderSchema.index({ "customerPhone": 1, "orderDate": 1 });
OrderSchema.index({ "orderDate": 1 });
const Order = model("Order", OrderSchema) as Model<IOrder>;
global.models.Order = Order;

export default Order;