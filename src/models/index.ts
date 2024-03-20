global.models = {};
import mongoose, { Model } from "mongoose";
import UserModel, { IUser } from "./user";
import InvoiceModel, { IInvoice } from "./invoice";
import ProductModel, { IProduct } from "./product";
import ImageModel, { IImage } from "./image";

const dbConnectionPromise = mongoose.connect(process.env.MONGO_CONNECTION_URL as string);

export default dbConnectionPromise;

export const Image = ImageModel;
export const Product = ProductModel;
export const User = UserModel;
export const Invoice = InvoiceModel;

export type UserModelType = Model<IUser>;
export type InvoiceModelType = Model<IInvoice>;
export type ProductModelType = Model<IProduct>;
export type ImageModelType = Model<IImage>;