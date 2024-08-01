global.models = {};
import mongoose, { Model } from "mongoose";
import UserModel, { IUser } from "./user";
import ProductModel, { IProduct } from "./product";
import ImageModel, { IImage } from "./image";
import OrderModel, { IOrder } from "./order";
import StatisticsModel, { IStatistics } from "./statistics";
import AdvertismentModel, { IAdvertisment } from "./advertisment";
import SettingsModel, { ISetting } from "./settings";

const dbConnectionPromise = mongoose.connect(process.env.MONGO_URI as string);

export default dbConnectionPromise;

export const Image = ImageModel;
export const Product = ProductModel;
export const User = UserModel;
export const Order = OrderModel;
export const Statistics = StatisticsModel;
export const Advertisment = AdvertismentModel;
export const Settings = SettingsModel;

export type UserModelType = Model<IUser>;
export type ProductModelType = Model<IProduct>;
export type ImageModelType = Model<IImage>;
export type OrderModelType = Model<IOrder>
export type StatisticsModelType = Model<IStatistics>;
export type AdvertismentModelType = Model<IAdvertisment>;
export type SettingsModelType = Model<ISetting>;
