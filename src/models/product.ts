import mongoose, { Model, ObjectId } from "mongoose";

export interface IProduct {
    _id: string;
    name: string;
    categories: string[];
    images: ObjectId[];
    description: string;
    price: number;
    tax: number;
    profitRatio: number;
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
    price: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number, // percent number represents the  tax rate (e.g., 10 for a 10% tax)
    },
    profitRatio: {
        type: Number, // percent number represents  the ratio between selling price and cost price (e.g., 50 for a 50%)
        requried: true,
    },
});

ProductSchema.index({ price: 1, name: 1 });
const Product = mongoose.model("product", ProductSchema) as Model<IProduct>;
global.models.Product = Product;
export default Product;