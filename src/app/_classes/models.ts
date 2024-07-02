import { ImageModelType, ProductModelType, UserModelType, OrderModelType, StatisticsModelType } from "@/models";
if (!global.models) {
    global.models = {};
}

const UserModel = global.models.User;
const ImageModel = global.models.Image;
const ProductModel = global.models.Product;
const OrderModel = global.models.Order;
const StatisticsModel = global.models.Statistics;

export const Image = ImageModel as ImageModelType;
export const User = UserModel as UserModelType;
export const Product = ProductModel as ProductModelType;
export const Order = OrderModel as OrderModelType;
export const Statistics = StatisticsModel as StatisticsModelType;