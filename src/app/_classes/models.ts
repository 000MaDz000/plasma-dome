import { ImageModelType, InvoiceModelType, ProductModelType, UserModelType, OrderModelType } from "@/models";
if (!global.models) {
    global.models = {};
}

const UserModel = global.models.User;
const ImageModel = global.models.Image;
const ProductModel = global.models.Product;
const InvoiceModel = global.models.Invoice;
const OrderModel = global.models.Order;

export const Image = ImageModel as ImageModelType;
export const User = UserModel as UserModelType;
export const Product = ProductModel as ProductModelType;
export const Invoice = InvoiceModel as InvoiceModelType;
export const Order = OrderModel as OrderModelType;