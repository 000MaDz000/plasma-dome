import mongoose, { Model, ObjectId } from "mongoose";

export interface IProduct {
    _id: string;
    name: string;
    categories: string[];
    images: ObjectId[];
    description: string;
    price: number;
    discount?: number;
    tax: number;
    profitRatio: number;
    showTypes: ({ showType: "featured" | "normal", level: number })[]
}

const ProductSchema = new mongoose.Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    images: {
        ref: "Image",
        type: [{ type: mongoose.SchemaTypes.ObjectId }],  // Array of ObjectIDs pointing to Image documents.
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    showTypes: {
        type: [{
            showType: {
                type: String,
                required: true,
            },
            level: {
                type: Number,
                required: true
            }
        }],
        default: [{ "level": 1, "showType": "normal" }],
    },
    price: {
        type: Number,
        required: true,
    },
    discount: Number,
    tax: {
        type: Number, // percent number represents the  tax rate (e.g., 10 for a 10% tax)
    },
    profitRatio: {
        type: Number, // percent number represents  the ratio between selling price and cost price (e.g., 50 for a 50%)
        requried: true,
    },
});

ProductSchema.index({ price: 1, name: 1 });
ProductSchema.index({ categories: 1 });
const Product = mongoose.model("product", ProductSchema) as Model<IProduct>;
global.models.Product = Product;
export default Product;