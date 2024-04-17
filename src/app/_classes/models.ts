import { GhostModelType, ImageModelType, InvoiceModelType, ProductModelType, UserModelType } from "@/models";
if (!global.models) {
    global.models = {};
}

const UserModel = global.models.User;
const ImageModel = global.models.Image;
const ProductModel = global.models.Product;
const InvoiceModel = global.models.Invoice;
const GhostModel = global.models.Ghost;

export const Image = ImageModel as ImageModelType;
export const User = UserModel as UserModelType;
export const Product = ProductModel as ProductModelType;
export const Invoice = InvoiceModel as InvoiceModelType;
export const Ghost = GhostModel as GhostModelType;